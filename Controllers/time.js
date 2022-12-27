

exports.time = (req, res) => {
        res.send({
                ts: Date.now()
        }).status(200)
}