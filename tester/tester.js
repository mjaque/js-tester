class Tester{
	#listaPathsTestSuites
	#testSuites = new Set()
	#resultados = new Map()
	#vistaResultados

	constructor(listaPathsTestSuites, vistaResultados){
		this.#listaPathsTestSuites = listaPathsTestSuites
		this.#vistaResultados = vistaResultados
	}

	ejecutar = () => {
		this.cargarTestSuites()
		.then( () => this.ejecutarTestSuites())
	}

	cargarTestSuites(){
		return import(this.#listaPathsTestSuites)
		.then ( importado => { 
			const listaPathsTestSuites = importado.listaPathsTestSuites
			const promesas = []
			listaPathsTestSuites.forEach( pathTestSuite => {
				promesas.push(this.cargarTestSuite(pathTestSuite))
			})
			return Promise.all(promesas)
		})
	}

	cargarTestSuite(pathTestSuite){
		return import(pathTestSuite)
			.then( importado => {
				const claseTestSuite = importado.default
				const testSuite = new claseTestSuite(this)
				return testSuite.cargarTestCases()
				.then( () => {
					this.#testSuites.add(testSuite)
					console.log(`Cargada TestSuite: ${pathTestSuite}`)
				})
			})
	}

	ejecutarTestSuites = () => {
		this.#testSuites.forEach( testSuite => {
			this.#resultados.set(testSuite.getNombre(), new Map())
			testSuite.ejecutar()
		})
		this.actualizarResultados()
	}

	registrarTestCase(nombreTestSuite, nombreTestCase){
		const resultadosTestSuite = this.#resultados.get(nombreTestSuite)
		resultadosTestSuite.set(nombreTestCase, null)
	}

	pasar(nombreTestSuite, nombreTestCase){
		console.log(`Tester: ${nombreTestSuite}.${nombreTestCase}: OK`)
		const resultadosTestSuite = this.#resultados.get(nombreTestSuite)
		resultadosTestSuite.set(nombreTestCase, [true])
		this.actualizarResultados()
	}

	fallar(nombreTestSuite, nombreTestCase, causa){
		console.error(`Tester: ${nombreTestSuite}.${nombreTestCase}: KO - ${causa}`)
		const resultadosTestSuite = this.#resultados.get(nombreTestSuite)
		resultadosTestSuite.set(nombreTestCase, [false, causa])
		this.actualizarResultados()
	}

	actualizarResultados(){
		this.#vistaResultados.actualizar(this.#resultados)	
	}

	registrarError(evento){
		console.log('Registrado error global')
		console.log(evento)
	}
}

class VistaResultados{
	
	#base

	constructor(base){
		if (!base)
			base = document.body
		this.#base = base
	}

	actualizar(resultados){
		let superados = 0
		let total = 0

		this.#base.innerHTML = ''
		const h1 = document.createElement('h1')
		this.#base.appendChild(h1)
		
		const pTotal = document.createElement('p')
		this.#base.appendChild(pTotal)

		h1.textContent = 'Resultados'
		resultados.forEach( (testscases, testSuite) => {
			const h2 = document.createElement('h2')
			this.#base.appendChild(h2)
			h2.textContent = `${testSuite}`
			testscases.forEach( (resultado, testCase) => {
				total++
				const p = document.createElement('p')
				this.#base.appendChild(p)
				p.textContent = `${testCase}: `
				if (resultado === null)
					p.textContent += `ejecutándose...`
				else {
					if (resultado[0] === true){
						p.textContent += `OK`
						p.classList.add('ok')
						superados++
					}
					else{
						p.textContent += `KO (${resultado[1]})`
						p.classList.add('ko')
					}
				}
			})
		})
		pTotal.textContent = `Superados ${superados}/${total} tests`
	}
}

const tester = new Tester('../lista_testsuites.js', new VistaResultados())
window.onload = tester.ejecutar
window.onerror = tester.registrarError
