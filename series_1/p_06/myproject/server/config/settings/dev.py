# -*- coding: utf-8 -*-
"""
Django developer settings

- debug mode true
- django-debug-toolbar
- django-extensions

"""

from .base import *  # noqa

# ------------------------------------------------------------------------------
# DEBUG
# ------------------------------------------------------------------------------

DEBUG = env.bool('DJANGO_DEBUG', default=True)

TEMPLATES[0]['OPTIONS']['debug'] = DEBUG


# ------------------------------------------------------------------------------
# SECRET CONFIGURATION
# ------------------------------------------------------------------------------

# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Note: This key only used for development and testing.`
SECRET_KEY = env("DJANGO_SECRET_KEY", default='CHANGEME!!!')

# ------------------------------------------------------------------------------
# STATIC
# ------------------------------------------------------------------------------

STATICFILES_DIRS = (
    str(ROOT_DIR.path('assets')),
)
