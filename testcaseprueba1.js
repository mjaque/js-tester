import { TestCase }  from './tester/testcase.js'

// Es necesario exportar el TestCase como "default" para que lo detecte la TestSuite.
export default class TestCasePrueba1 extends TestCase{

	ejecutar(){
		//this.preparar()
		this.pasar()
		//this.fallar()
		//this.cerrar()
	}

}
