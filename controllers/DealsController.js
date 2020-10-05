const mongoose = require("mongoose");
const createError = require("http-errors");
const moment = require("moment");

const Deal = require("../models/Deal");
const config = require("../config/environment");
const { check } = require("../lib/encryption");

exports.getDeals = async (req, res, next) => {
  let deals = { searcher: undefined, provider: undefined };
  deals["searcher"] = await Deal.find({ searcher: req.user._id })
    .populate(
      "searcher",
      "-email -city -street -zip -services -availability -bio"
    )
    .populate(
      "provider",
      "-email -city -street -zip -services -availability -bio"
    )
    .populate("dealService");

  deals["provider"] = await Deal.find({ provider: req.user._id })
    .populate(
      "searcher",
      "-email -city -street -zip -services -availability -bio"
    )
    .populate(
      "provider",
      "-email -city -street -zip -services -availability -bio"
    )
    .populate("dealService");
  console.log(deals);
  res.status(200).send(deals);
};

exports.addDeal = async (req, res, next) => {
  try {
    // const newUser = new User(req.body);
    const newDeal = new Deal({ ...req.body, searcher: req.user._id });
    /* if (req.user._id !== req.body.searcher)
      throw new createError.NotAcceptable(
        "The deal Creator should be logged in user"
      ); */
    await newDeal.save();
    res.status(201).send(newDeal);
  } catch (err) {
    next(err);
  }
};

exports.confirmDeal = async (req, res, next) => {
  try {
    const dealId = req.params.id;
    const checkConfirmedDeal = await Deal.findById(dealId);

    if (String(checkConfirmedDeal.provider) !== String(req.user._id)) {
      throw new createError("You only can confirm the deals you provide");
    } else if (checkConfirmedDeal.canceled) {
      throw new createError("Deal is already canceled");
    } else {
      /* checkConfirmedDeal.approved = true;
      checkConfirmedDeal.save(); */
      const confirmDeal = await Deal.findByIdAndUpdate(
        dealId,
        {
          approved: true,
        },
        { new: true }
      );
      res.status(200).send(confirmDeal);
    }
  } catch (err) {
    next(err);
  }
};

exports.cancelDeal = async (req, res, next) => {
  try {
    const dealId = req.params.id;
    const checkCancelDeal = await Deal.findById(dealId);
    if (checkCancelDeal.canceled)
      throw new createError("Deal is already canceled");

    if (String(checkCancelDeal.searcher) === String(req.user._id)) {
      if (checkCancelDeal.approved)
        throw new createError("Deal is already approved");
      else {
        const cancelDeal = await Deal.findByIdAndUpdate(
          dealId,
          { canceled: true },
          { new: true }
        );
        res.status(200).send(cancelDeal);
      }
    } else if (String(checkCancelDeal.provider) === String(req.user._id)) {
      if (checkCancelDeal.approved)
        throw new createError("You cannot cancel an already approved deal");
      else {
        const cancelDeal = await Deal.findByIdAndUpdate(
          dealId,
          { canceled: true },
          { new: true }
        );
        res.status(200).send(cancelDeal);
      }
    } else {
      throw new createError("You can't cancel a deal you aren't a part of");
    }
  } catch (err) {
    next(err);
  }
};
