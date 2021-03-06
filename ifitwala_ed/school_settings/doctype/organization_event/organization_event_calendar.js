// Copyright (c) 2021, ifitwala and contributors
// For license information, please see license.txt

frappe.views.calendar['Organization Event'] = {
  field_map:{
    'start': 'starts_on',
    'end': 'ends_on',
    'id':  'name',
    'title': 'subject',
    'eventColor': 'color',
    'allDay': 'all_day'
  },
  gantt: false,
  order_by: 'starts_on',
  get_events_method: 'ifitwala_ed.school_settings.doctype.organization_event.organization_event.get_organization_events',
  filters: [
    {
			"fieldtype": "Select",
			"fieldname": "event_category",
			"options": "Meeting\nCourse\nAppointment\nOther",
			"label": __("Event Category")
		},
    {
      "fieldtype": "Link",
      "fieldname": "room",
      "options": "Room",
      "label": __("Room")
    }
  ]

}
