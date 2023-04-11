/**
 * This file is only need if you want to extract messages into JSON files in locales folder
 * AND if you are also using the object syntax instead of string syntax. \
 * Check the documentation section i18n for details
 */

import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  routingTitle: () =>
    _t(
      // translations.routingFeature.title,
      'Industry-standard Routing', // you can set the default value when extracting
    ),
  i18nTitle: () => _t(translations.i18nFeature.title),
  i18nDescription: () => _t(translations.i18nFeature.description),
  privacyPolicyTitle: () => _t(translations.privacyPolicy.title),
  privacyPolicy: () => _t(translations.privacyPolicy.description),
};
