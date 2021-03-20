// Copyright (c) 2021, ifitwala and contributors
// For license information, please see license.txt

frappe.ui.form.on('Global Defaults', {
	onload: function(frm) {
		frm.trigger('get_distance_uoms');
	},
	validate: function(frm) {
		frm.call('get_defaults', null, r => {
			frappe.sys_defaults = r.message;
		})
	},
	get_distance_uoms: function (frm) {
		let units = [];

		frappe.call({
			method: "frappe.client.get_list",
			args: {
				doctype: "UOM Conversion Factor",
				filters: { "category": "Length" },
				fields: ["to_uom"],
				limit_page_length: 50
			},
			callback: function (r) {
				r.message.forEach(row => units.push(row.to_uom));
			}
		});
		frm.set_query("default_distance_unit", function () {
			return { filters: { "name": ["IN", units] } };
		});
	}
});
