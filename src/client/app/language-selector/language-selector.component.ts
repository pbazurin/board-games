import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'bg-language-selector',
  templateUrl: './language-selector.component.html'
})
export class LanguageSelectorComponent {
  constructor(
    private translate: TranslateService,
  ) { }

  languageChanged(selectedItem: string): void {
    this.translate.use(selectedItem);
    this.loadLocaleData(selectedItem);
  }

  loadLocaleData(lang) {
    import(`@angular/common/locales/${lang}.js`).then(locale => {
      registerLocaleData(locale.default);
    });
  }

  get currentLang() {
    return this.translate.currentLang;
  }

  get languages() {
    return this.translate.langs;
  }
}
