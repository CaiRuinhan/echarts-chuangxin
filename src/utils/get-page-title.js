import defaultSettings from '@/settings'

const title = defaultSettings.title || 'unisk-vue-mobile'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
