import settings from './settings'
import project from './project'
import category from './category'
import about from './about'
import contact from './contact'
import links from './links'

export const schemaTypes = [settings, project, category, about, contact, links]

export const singletonTypes = new Set(['settings', 'about', 'contact', 'links'])
