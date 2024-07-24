import { TestSuite } from './tester/testsuite.js'

// Es necesario exportar la TestSuite como "default" para que la detecte Tester.
export default class TestSuitePrueba extends TestSuite{

	// El path está referido a la ubicación del tester,
	listaPathsTestCases = [
		'../testcaseprueba1.js',
		'../testcaseprueba2.js',
		'../testcaseprueba3.js'
	]

}

