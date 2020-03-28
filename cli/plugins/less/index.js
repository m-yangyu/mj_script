class Less {
    constructor() {

    }
    apply(gen) {
        gen.hooks.afterCreatePlugin.tap('less', () => {
            console.log(123);
        })
    }
}

module.exports = Less;