# -*- coding: utf-8 -*-
# Copyright (c) 2020, ifitwala and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
import ifitwala_ed.utils as utils

no_cache = 1

# always get context first for portal
def get_context(context):
    try:
        program = frappe.form_dict['program']
    except KeyError:
        frappe.local.flags.redirect_location =  '/cms'
        raise frappe.Redirect

    context.education_settings = frappe.get_single("Education Settings")
    context.program = get_program(program)
    context.featured_courses = get_featured_courses(program)
    context.courses = get_allowed_courses(context.featured_courses)
    context.has_access =  utils.allowed_program_access(program)

def get_program(program_name):
    try:
        return frappe.get_doc("Program", program_name)
    except frappe.DoesNotExistError:
        frappe.throw(_("Program {0} does not exist").format(program_name))

def get_featured_courses(program):
    return utils.get_portal_courses(program)

def get_allowed_courses(featured_courses):
    courses = []
    for c in featured_courses:
        courses.append(c.get("course"))

    return [frappe.get_doc("Course", course) for course in courses]
