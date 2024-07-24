import { TestCase }  from './tester/testcase.js'

// Es necesario exportar el TestCase como "default" para que lo detecte la TestSuite.
export default class TestCasePrueba2 extends TestCase{

	ejecutar(){
		//this.preparar()
		//this.pasar()
		this.fallar('Causa del fallo')
		//this.cerrar()
	}

}
