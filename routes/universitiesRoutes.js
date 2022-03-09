const router = require('express').Router()
const Universities = require('../models/Universities.js')


router.post('/', async (req, res) => {
    const {alpha_two_code, web_pages, name, country, domains, state_province} = req.body

    if(!name) {
        res.status(422).json({error: 'O nome e obrigatorio'})
        return
    }


    const universities = {
        alpha_two_code, 
        web_pages, 
        name,
        country,
        domains,
        state_province
    }
    try {
        await Universities.create(universities)
        res.status(201).json({message: 'Universidade cadastrada com sucesso'})
    }   catch (error) {
        res.status(500).json({error: error})
    }

})


router.get('/', async (req, res) => {
    try {
        const universitie = await Universities.find()
        res.status(200).json(universitie)
    } catch(error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
try {
    const universities = await Universities.findById({_id: id})
    if(!universities) {
        res.status(422).json({message: 'O usuario nao foi encontrado'})
       return
    } 
    res.status(200).json(universities)
} catch (error){
    res.status(500).json({error: error})
}
})





router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {alpha_two_code, web_pages, name, country, domains, state_province} = req.body

    const universities = {
        alpha_two_code, 
        web_pages, 
        name,
        country,
        domains,
        state_province
    }
    try {
        const updatedUniversities = await Universities.updateOne({_id:id}, universities)
        if(updatedUniversities.matchedCount == 0) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
            return
        }

        res.status(200).json(universities)
    } catch(error) {
        res.status(500).json({error: error})
    }

})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const Universities = await Universities.findOne({_id: id})

    if(!Universities) {
        res.status(422).json({message: 'O usuario não foi encontrado!'})
        return
    }

    try {
        await Universities.deleteOne({_id: id})
        res.status(200).json({message: 'usuario removido com sucesso'})
    } catch(error) {
        res.status(500).json({error: error})
    }
})


module.exports = router