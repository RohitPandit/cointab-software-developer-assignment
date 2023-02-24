const axios = require("axios")
const User = require("../models/users")

exports.fetchUsers = (req, res) => {
    try {
        var config = {
            method: 'get',
            url: 'https://randomuser.me/api?results=50',
        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                User.createMultiUser(
                    response.data.results,
                    (err, usersData) => {
                        if (err)
                            return res.status(400).send({
                                status: false,
                                message: err.message || "Some error occurred while creating the Users."
                            });

                        if (usersData.status === true) {
                            return res.status(200).json({
                                success: true,
                                message: "Successfully fetched the users",
                                data: response.data
                            });
                        }
                    }
                );
                // return res.send({ status: true, message: "Fetch User Successfully.", data: response.data })
            })
            .catch(function (error) {
                throw new Error(error)
            });
    } catch (error) {
        throw new Error(error)
    }
}