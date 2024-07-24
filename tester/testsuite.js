export class TestSuite {
	
	#tester
	#testCases = new Set()
	#estado = new Map()

	constructor(tester){
		this.#tester = tester
	}

	cargarTestCases(){
		const promesas = []
		this.listaPathsTestCases.forEach( pathTestCase => {
			promesas.push(this.cargarTestCase(pathTestCase))
		})
		return Promise.all(promesas)
	}

	cargarTestCase(pathTestCase){
		return import(pathTestCase)
			.then( importado => {
				const claseTestCase = importado.default
				const testCase = new claseTestCase(this)
				this.#testCases.add(testCase)
				console.log(`Cargado TestCase: ${pathTestCase}`)
			})
	}

	ejecutar(){
		this.#testCases.forEach( testCase => {
			this.#tester.registrarTestCase(this.getNombre(), testCase.getNombre())
			testCase.ejecutar() 
		})
	}

	pasar(nombreTest){
		this.#tester.pasar(this.getNombre(), nombreTest)
	}

	fallar(nombreTest, causa){
		this.#tester.fallar(this.getNombre(), nombreTest, causa)
	}
	
	getNombre(){
		return this.constructor.name
	}

}
