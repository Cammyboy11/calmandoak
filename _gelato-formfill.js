// Form-fill helpers for driving the Gelato Add-to-Store wizard.
// Eval this in the page once (via Chrome MCP javascript_tool) to install window.CO.
// Then call CO.setDesc(...), CO.addTags([...]), CO.setPrices({...}), CO.click(...), CO.wait(...) per step.

(function(){
  window.CO = {
    // ── reactive-form-aware text setter ──
    setText(el, val) {
      if (!el) return false;
      const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input',  { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      return true;
    },

    // ── find the description textarea robustly (Angular sometimes only sets the property) ──
    findDesc() {
      return [...document.querySelectorAll('textarea')].find(t =>
        t.name === 'Description' ||
        t.getAttribute('formcontrolname') === 'Description' ||
        (t.placeholder||'').toLowerCase().includes('descrip')
      );
    },

    setDesc(text) {
      const ta = this.findDesc();
      if (!ta) return 'no description textarea found';
      this.setText(ta, text);
      ta.dispatchEvent(new Event('blur', { bubbles: true }));
      return 'description set (' + ta.value.length + ' chars)';
    },

    // ── add tags to the ng-select multi-select ──
    async addTags(tags) {
      const ngSel = document.querySelector('ng-select.select.hide-tags') ||
                    document.querySelector('ng-select[multiple]') ||
                    document.querySelector('ng-select');
      if (!ngSel) return 'no ng-select';
      const inp = ngSel.querySelector('input[role=combobox]') || ngSel.querySelector('input');
      if (!inp) return 'no combobox input';
      let added = 0;
      for (const tag of tags) {
        inp.focus();
        this.setText(inp, tag);
        await this.wait(280);
        // Some ng-select variants need Enter; "addTag" mode also responds to Tab
        inp.dispatchEvent(new KeyboardEvent('keydown', { key:'Enter', code:'Enter', keyCode:13, which:13, bubbles:true }));
        await this.wait(280);
        added++;
      }
      // count chips in the widget to confirm
      const chipCount = ngSel.querySelectorAll('.ng-value, .tag').length;
      return 'attempted ' + added + ' adds; chip count now ' + chipCount;
    },

    // ── click any button/anchor by visible text (case-insensitive) ──
    click(text) {
      const target = text.toLowerCase().trim();
      const btn = [...document.querySelectorAll('button,a')].find(b => {
        const t = (b.innerText || '').trim().toLowerCase();
        return t === target || t.startsWith(target);
      });
      if (!btn) return 'no element with text: ' + text;
      btn.click();
      return 'clicked: ' + (btn.innerText||'').trim().slice(0,40);
    },

    // ── set per-size prices on the Prices step ──
    // Pass { '8x10': 28, '11x14': 42, '16x20': 68 }. Will look up the right input per variant row.
    setPrices(priceMap) {
      const rows = [...document.querySelectorAll('tr,[class*=variant-row],[class*=size-row],[class*=price-row]')];
      const results = [];
      for (const [size, price] of Object.entries(priceMap)) {
        const sizePattern = new RegExp(size.replace('x','\\s?[x×]\\s?'), 'i');
        const row = rows.find(r => sizePattern.test((r.innerText||'')));
        if (!row) { results.push(size + ':no-row'); continue; }
        const inp = row.querySelector('input[type=number]') || row.querySelector('input');
        if (!inp) { results.push(size + ':no-input'); continue; }
        this.setText(inp, String(price));
        results.push(size + ':$' + price);
      }
      return results.join(', ');
    },

    // ── wait ──
    wait(ms) { return new Promise(r => setTimeout(r, ms)); },

    // ── inspect current wizard step / route ──
    step() {
      const url = location.href;
      if (url.includes('/design'))   return 'design';
      if (url.includes('/media'))    return 'mockups';
      if (url.includes('/details'))  return 'details';
      if (url.includes('/prices'))   return 'prices';
      if (url.includes('/review'))   return 'review';
      return 'unknown:' + url.split('/').pop();
    },
  };
  return 'CO helpers installed: ' + Object.keys(window.CO).join(', ');
})()
