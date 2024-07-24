export class TestCase{

	#testSuite

	constructor(testSuite){
		this.#testSuite = testSuite
	}

	pasar = () => {
		this.#testSuite.pasar(this.getNombre())
	}

	fallar = (causa) => {
		this.#testSuite.fallar(this.getNombre(), causa)
	}

	getNombre(){
		return this.constructor.name
	}

}
