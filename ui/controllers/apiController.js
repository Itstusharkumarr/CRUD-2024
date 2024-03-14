import usermodel from "../model/usermodel.js"
import fs from 'fs'

export const readApiControlle = async (req, res) => {
    try {
        //pagination
        //  let page = req.query.page
        //  let limit = req.query.limit
        //  const skip = (page-1)*10
        //  if(!page){page=1}
        //  if(!limit){limit=10}

        const user = await usermodel.find().select('-photo').sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "data found successfully",
            user,
            // page:page,
            // limit:limit,
            // user:user
        })



    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data not found",
            error
        })
    }
}

export const createApiController = async (req, res) => {

    try {
        const { name, lastname, phone, email, address } = req.fields
        const { photo } = req.files
        // console.log(req.fields)
        // console.log(req.files)


        //validation
        if (!name) { return res.status(500).send({ message: "name is required" }) }
        if (!lastname) { return res.status(500).send({ message: "lastname is required" }) }
        if (!phone) { return res.status(500).send({ message: "Phone number is required" }) }
        if (!email) { return res.status(500).send({ message: "E-mail is required" }) }
        if (!address) { return res.status(500).send({ message: "Address is required" }) }
        if (!photo && photo.size > 1000000) {
            return res.status(500).send({ message: "photo is required and should be less than 1MB" })
        }

        const data = usermodel({
            ...req.fields,
            name: name,
            lastname: lastname,
            phone: phone,
            email: email,
            address: address,
        })
        if (photo) {
            data.photo.data = fs.readFileSync(photo.path)
            data.photo.contentType = photo.type
        }
        await data.save()
        console.log(data)
        res.status(200).send({
            success: true,
            message: "data inserted successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data is not inserted",
            error
        })
    }
}

export const updateApiController = async (req, res) => {
    try {
        const { name, lastname, phone, email, address } = req.fields
        const { photo } = req.files
        const id = req.params.id
        console.log(id)
        const data = await usermodel.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    ...req.fields,
                    name: name,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    address: address,
                    photo: photo
                }

            }, { new: true })
        if (photo) {
            data.photo.data = fs.readFileSync(photo.path)
            data.photo.contentType = photo.type
        }
        await data.save()
        res.status(200).send({
            success: true,
            message: "data updated successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data not updated...!",
            error
        })
    }
}

export const deleteApiController = async (req, res) => {
    try {
        const id = req.params.id
        const data = await usermodel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            success: true,
            message: "data deleted successfully",
            data
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data not deleted",
            error
        })
    }
}

export const searchApiController = async (req, res) => {
    try {
        const { keyboard } = req.params
        const result = await usermodel.find({
            $or: [
                { name: { $regex: keyboard, $options: 'i' } },
                { lastname: { $regex: keyboard, $options: 'i' } }
            ]
        })
        res.status(200).send({
            success: true,
            message: "data is found",
            result
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "data is not found",
            error
        })
    }
}

export const photoUploadController = async (req, res) => {
    try {
        const id = req.params.id
        const upload = await usermodel.findById({ _id: id }).select("photo")
        if (upload.photo.data) {
            res.set('content-type', upload.photo.contentType)
            return res.status(200).send(upload.photo.data)
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "photo is not uploaded...!",
            error
        })
    }
}

export const singleApiController = async (req, res) => {
           try {
            const id = req.params.id
            const user = await usermodel.findById({_id:id}).select('-photo')
            if(!user){
                return res.status(404).send({message:"user not found"})
            }
            res.status(200).send({
                success:true,
                message:"user detail",
                user
            })
           } catch (error) {
            res.status(500).send({
                success:false,
                message:"single user not found",
                error
            })
           }
}