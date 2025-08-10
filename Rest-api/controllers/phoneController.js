const { phoneModel, cartModel, userModel } = require("../models");
const { populate } = require("../models/userModel");
const { getProfileInfo } = require("./auth");
const { newComment } = require("./commentController");
const mongoose = require("mongoose");

function getPhones(req, res, next) {
    phoneModel
        .find()
        .populate("userId")
        .then((phones) => res.json(phones))
        .catch(next);
}
function getLatestsPhones(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    phoneModel
        .find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate("userId", "username email")
        .populate({
            path: "comments",
            select: "text userId likes",
            populate: {
                path: "userId",
                select: "username",
            },
        })
        .then((phones) => res.status(200).json(phones))
        .catch(next);
}

function getPhone(req, res, next) {
    const { phoneId } = req.params;

    phoneModel
        .findById(phoneId)
        .populate({
            path: "comments",
            populate: {
                path: "userId",
            },
        })
        .then((phone) => res.json(phone))
        .catch(next);
}

function createPhone(req, res, next) {
    const { phoneName, displaySize, color, price, image, cpu, ram, storage } =
        req.body;
    const { _id: userId } = req.user;

    phoneModel
        .create({
            phoneName,
            displaySize,
            color,
            price,
            image,
            cpu,
            ram,
            storage,
            userId,
            comments: [],
            buyers: [],
        })
        .then((phone) => {
            return userModel
                .findByIdAndUpdate(
                    userId,
                    { $push: { phones: phone._id } },
                    { new: true }
                )
                .then(() => phone);
        })
        .then((phone) => {
            res.status(201).json(phone);
        })
        .catch((err) => {
            console.error("Error with creating phone:", err);
            next(err);
        });
}
function getMyPhones(req, res, next) {
    const currentUserId = req.params.userId;

    if (!currentUserId) {
        return res
            .status(401)
            .json({ error: "Unauthorized - User not identified" });
    }

    if (!mongoose.Types.ObjectId.isValid(currentUserId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    phoneModel
        .find({ userId: currentUserId })
        .sort({ created_at: -1 })
        .populate("userId", "username email")
        .populate({
            path: "comments",
            select: "text userId likes",
            populate: {
                path: "userId",
                select: "username",
            },
        })
        .lean()
        .then((phones) => {
            res.status(200).json(phones || []);
        })
        .catch((error) => {
            console.error("Error fetching user's phones:", error);
            next(error);
        });
}

function editPhone(req, res, next) {
    const id = req.params.phoneId;

    const updates = req.body;
    const { _id: userId } = req.user;

    phoneModel
        .findOneAndUpdate({ _id: id, userId: userId }, updates, { new: true })
        .then((updatedPhone) => {
            if (!updatedPhone) {
                return res.status(404).json({
                    message: "Phone not found or you are not the owner",
                });
            }
            res.status(200).json(updatedPhone);
        })
        .catch((err) => {
            console.error("Error updating phone:", err);
            next(err);
        });
}
function deletePhone(req, res, next) {
    const { phoneId } = req.params;
    const userId = req.user._id;

    if (!phoneId || !mongoose.Types.ObjectId.isValid(phoneId)) {
        return res.status(400).json({ message: "Invalid phone ID!" });
    }

    phoneModel
        .findOneAndDelete({ _id: phoneId, userId })
        .then((deletedPhone) => {
            if (!deletedPhone) {
                return res.status(404).json({
                    message: "Phone not found or you don't have permission!",
                });
            }

            return userModel
                .findByIdAndUpdate(userId, { $pull: { phones: phoneId } })
                .then(() => {
                    res.status(200).json({
                        message: "Phone deleted successfully",
                        deletedPhone,
                    });
                });
        })
        .catch((error) => {
            console.error("Error while deleting phone:", error);
            next(error);
        });
}
function buy(req, res, next) {
    const phoneId = req.params.phoneId;
    const { _id: userId } = req.user;
    phoneModel
        .findByIdAndUpdate(
            { _id: phoneId },
            { $addToSet: { buyers: userId } },
            { new: true }
        )
        .then((updatedPhone) => {
            res.status(200).json(updatedPhone);
        })
        .catch(next);
}
async function buyPhone(req, res, next) {
    const { phoneId } = req.params;
    const { _id: userId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(phoneId)) {
        return res.status(400).json({ error: "Wrong productId!" });
    }

    try {
        const cart = await cartModel.findOneAndUpdate(
            { userId, "items.phone": phoneId },
            { $inc: { "items.$.quantity": 1 } },
            { new: true }
        );

        if (!cart) {
            const newCart = await cartModel.findOneAndUpdate(
                { userId },
                { $push: { items: { phone: phoneId, quantity: 1 } } },
                { new: true, upsert: true }
            );
            return res.status(200).json(newCart);
        }

        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}
function getCartItems(req, res, next) {
    // const isOwner = planet.owner.equals(req.user?.id);
    //   console.log(`isOwner: ${req.user.id}`);

    console.log(req.user);

    //     cartModel.findOne({ userId })
    //         .populate({
    //             path: 'items.phone',
    //             populate: {
    //                 path: 'userId',
    //                 select: 'username email'
    //             }
    //         })
    //         .then(cart => res.json(cart || { items: [] }))
    //         .catch(next);
}

module.exports = {
    getPhones,
    getLatestsPhones,
    createPhone,
    getPhone,
    buy,
    buyPhone,
    getCartItems,
    editPhone,
    deletePhone,
    getMyPhones,
};
