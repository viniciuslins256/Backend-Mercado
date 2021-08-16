module.exports = {

    async index(req, res){
        try{
            return res.status(200).send({"Products": "Tudo ok com o método index de products!"})
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async show(req, res){
        try{
            return res.status(200).send({"Products": "Tudo ok com o método show de products!"})
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async save(req, res){
        try{
            return res.status(200).send({"Products": "Tudo ok com o método save de products!"})
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async update(req, res){
        try{
            return res.status(200).send({"Products": "Tudo ok com o método update de products!"})
        }catch(error){
            return res.status(400).send(error.message)
        }
    },

    async remove(req, res){
        try{
            return res.status(200).send({"Products": "Tudo ok com o método delete de products!"})
        }catch(error){
            return res.status(400).send(error.message)
        }
    }
}