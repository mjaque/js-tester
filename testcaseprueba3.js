import { TestCase }  from './tester/testcase.js'

// Es necesario exportar el TestCase como "default" para que lo detecte la TestSuite.
export default class TestCasePrueba3 extends TestCase{

	ejecutar(){
		//this.preparar()
		//this.pasar()
		this.testAsincrono()
		//this.cerrar()
	}

	testAsincrono(){
		let promesa = new Promise( (resolver, rechazar) => {
			setTimeout( resolver, 1000)
			//setTimeout( rechazar, 1000)
		})
		.then( this.pasar, this.fallar.bind(this, 'causa del fallo')  )
	}


}
