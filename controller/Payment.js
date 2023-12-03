import midtransClient from "midtrans-client"

export const createPayment = (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction : false,
            serverKey: "SB-Mid-server-lEFj0yHDs4L-hrHIUZi9mTBs",
            clientKey: "SB-Mid-client-bvdAkRQwbwOXIroT"
        })

        const parameter = {
            transaction_details : {
                order_id  : req.body.order_id,
                gross_amount: req.body.total
            },
            customer_details : {
                first_name : req.body.name,
                email : req.body.email,
            }
        }

        snap.createTransaction(parameter).then((transaction) => {
            const dataPayment = {
                response: JSON.stringify(transaction)
            }
            const token = transaction.token;

            res.status(200).json({message : "Berhasil", dataPayment, token: token})
        })

       
    } catch (error) {
        res.status(500).json({msg: error.msg})
    }
}