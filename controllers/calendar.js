const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  try {
    const events = await Event.find();
    res.status(200).json({
      ok: true,
      message: "Eventos obtenidos satisfactoriamente",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      errors: "No se pudo traer los eventos de la base de datos",
    });
  }
};

const createEvent = async (req, res = response) => {
  const { uid } = req.user;

  try {
    if (req.body.end < req.body.start) {
      return res.status(400).json({
        ok: false,
        errors: "La fecha inicial  debe ser menor que la fecha final",
      });
    }

    req.body.user = uid;

    const event = new Event(req.body);

    await event.save();

    res.status(201).json({
      ok: true,
      message: "El evento ha sido creado satisfactoriamente",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      errors: "No se pudo crear el evento",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req.user;
  try {
    if (req.body.end < req.body.start) {
      return res.status(400).json({
        ok: false,
        errors: "La fecha inicial  debe ser menor que la fecha final",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        errors: `El evento con id ${eventId} no existe`,
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        errors: "No tiene permiso para editar este evento",
      });
    }

    req.body.user = event.user.toString();

    eventUpdated = await Event.findByIdAndUpdate(eventId, req.body, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      message: "El evento ha sido actualizado",
      eventUpdated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      errors: "No se pudo actualizar el evento",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventId = req.params.id;
  const { uid } = req.user;
  try {
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        errors: `El evento con id ${eventId} no existe`,
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        errors: "No tiene permiso para eliminar este evento",
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      ok: true,
      message: "El evento ha sido eliminado",
      event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      errors: "No se pudo eliminar el evento",
    });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
