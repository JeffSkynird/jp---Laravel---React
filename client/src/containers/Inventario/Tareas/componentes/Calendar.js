import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Initializer from "../../../../store/Initializer";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import { desencriptarJson } from "../../../../utils/security";
require("moment/locale/es.js");

const localizer = momentLocalizer(moment);
const messages = {
  allDay: 'Todo el día',
  previous: '<',
  next: '>',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango',
  showMore: total => `+ Ver más (${total})`
};
const MyCalendar1 = (props) => {
  const initializer = React.useContext(Initializer);
  const [data1, setData1] = React.useState([])
  const [leadClientsData, setLeadClientsData] = React.useState([]);
  const [leadClient, setLeadClient] = React.useState("");
  const [idCliente, setIdCliente] = React.useState("");

  const [desde, setDesde] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dataReagendada, setDataReagendada] = React.useState(null);

  const [refresh, setRefresh] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const [hasta, setHasta] = React.useState(new Date());
  const [data, setData] = React.useState([])
  const [tipo, setTipo] = React.useState("");

  React.useEffect(() => {
    if (initializer.usuario != null) {
      //obtenerLeadsPorAsesor(setLeadClientsData, initializer);
      setTipo(JSON.parse(desencriptarJson(initializer.usuario)).user.type_user)

    }
  }, [initializer.usuario]);
  /*  React.useEffect(() => {
     if (leadClient != "") {
       obtenerTodosPorLead(leadClient, setData1, initializer)
     }
   }, [leadClient]) */
  React.useEffect(() => {
    if (refresh != false) {
     // obtenerTodosPorAsesor(setData1, initializer)
      setRefresh(false)
    }
  }, [refresh])
  React.useEffect(() => {
    if (initializer.usuario != null) {
      if (leadClient == "") {
       // obtenerTodosPorAsesor(setData1, initializer)
      }
    }
  }, [initializer.usuario, leadClient]);
  const obtenerNombre = (id) => {
    let nombre = ""

    props.data.map((e) => {

      if (e.id == id) {
        nombre = e.description
      }
    })
    return nombre;
  }
  React.useEffect(() => {

    let events = []

    props.data.slice().map((e) => {

      console.log(e.date)
      events.push({...e,is_complete:e.is_complete, id: e.id, title:  obtenerNombre(e.id) + ' - '+(e.business_name!=null?e.business_name:"JP"), start: new Date(e.init_date), end: new Date(e.final_date), allDay: false, })
    })
    setData(events)


  }, [props.data])
  const select = (id) => {
    props.editar(id)
  }
  const eventStyleGetter = function (event, start, end, isSelected) {
      let color = event.is_complete ? '#26D06C' : '#3F51B5'
    var backgroundColor =color;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block"
    };
    return {
      style: style
    };
  };


  return (
    <div>
      <Calendar
        popup

        messages={messages}
        culture="es"
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(e) => {
          select(e);
        }}
      />
    </div>
  );
};
export default MyCalendar1;
