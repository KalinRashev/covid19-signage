import languages from './languages.js';
import rules from '../rules/index.js';

const content = {
	template: `
	<div class="outer-container">
		<div class="noprint">
			<h1 class="title">COVID-19 Signage Generator</h1>
			<div>
				<h2 class="subtitle">Step 1: Select languages to include</h2>
				<div v-for="language in languages">
					<img :src="'img/flags/' + language.key + '.svg'" class="language-flag"/>
					<button v-if="selectedLanguageKeys.includes(language.key)" @click="removeLanguage(language.key)" class="button is-success">
						Remove {{ language.displayName }}
					</button>
					<button v-else @click="addLanguage(language.key)" class="button is-outlined">
						Add {{ language.displayName }}
					</button>
				</div>
			</div>
			<div class="rule-selection">
				<h2 class="subtitle">Step 2: Select rules to include</h2>
				<div v-for="rule in rules" class="select-rule">
					<img :src="'img/icons/' + rule.icon + '.svg'" :class="rule.type"/>
					<div class="columns is-vcentered" v-if="selectedRuleNames.includes(rule.name)">
						<button @click="removeRule(rule.name)" class="button is-success">
							Remove 
						</button>
						<div>{{rule.lang["en"]}}</div>
					</div>
					
					<div v-else class="columns is-vcentered">
						<button @click="addRule(rule.name)" class="button is-outlined">
							Add 
						</button>
						<div>
							{{rule.lang["en"]}}
						</div>
					</div>
				</div>
			</div>
			<footer class="noprint">
				<a href="https://github.com/TOPdesk/covid19-signage/issues" target="_blank" rel="noreferrer noopener">Feedback</a>
			</footer>
		</div>
		<div class="preview-container">
			<header class="language-row">
				<div v-for="(languageKey, index) in selectedLanguageKeys" class="preview-flag">
					<img :src="'img/flags/' + languageKey + '.svg'" class="language-flag"/>
					<div class="sort" :class="index === 0 ? 'first' : index === selectedLanguageKeys.length - 1 ? 'last' : 'middle'">
						<button @click="moveLanguageUp(index)" class="noprint">&#x2BC7;</button>
						<button @click="moveLanguageDown(index)" class="noprint">&#x2BC8;</button>
					</div>
				</div>
			</header>
			<div v-if="!(selectedLanguageKeys.length && selectedRuleNames.length)">
				A preview of your sign will be shown here after you select at least one language and rule.
			</div>
			<div v-for="(rule, index) in selectedRules" class="rule-container">
				<div class="sort" :class="[index === 0 ? 'first' : index === selectedRules.length - 1 ? 'last' : 'middle', selectedRules.length === 1 ? 'only' : '']">
					<button @click="moveRuleUp(index)" class="noprint">&#x2BC5;</button>
					<button @click="moveRuleDown(index)" class="noprint">&#x2BC6;</button>
				</div>
				<div class="columns is-vcentered rule-content">
					<div :class="rule.type" class="columns is-centered icon">
						<img :src="'img/icons/' + rule.icon + '.svg'"/>
					</div>
					<div class="translations">
						<div v-for="languageKey in selectedLanguageKeys" class="translation-container">
							{{rule.lang[languageKey]}}
						</div>
					</div>
				</div>
			</div>
			<footer v-if="selectedLanguageKeys.length && selectedRuleNames.length">
				<span>Free multilingual sign, generated by https://www.covid19-signage.org</span>
			</footer>
		</div>
    </div>`,
	data() {
		return {
			selectedLanguageKeys: [],
			selectedRuleNames: [],
			languages,
			rules,
		};
	},
	computed: {
		selectedRules() {
			return this.rules
				.filter((rule) => this.selectedRuleNames.includes(rule.name))
				.sort((a, b) => this.selectedRuleNames.indexOf(a.name) - this.selectedRuleNames.indexOf(b.name));
		},
	},
	methods: {
		addRule(ruleName) {
			this.selectedRuleNames.push(ruleName);
		},
		removeRule(ruleName) {
			this.selectedRuleNames.splice(this.selectedRules.indexOf(ruleName), 1);
		},
		addLanguage(languageKey) {
			this.selectedLanguageKeys.push(languageKey);
		},
		removeLanguage(languageKey) {
			this.selectedLanguageKeys.splice(this.selectedLanguageKeys.indexOf(languageKey), 1);
		},
		moveRuleUp(index) {
			const goingUp = this.selectedRuleNames[index];
			Vue.set(this.selectedRuleNames, index, this.selectedRuleNames[index - 1]);
			Vue.set(this.selectedRuleNames, index - 1, goingUp);
		},
		moveRuleDown(index) {
			const goingDown = this.selectedRuleNames[index];
			Vue.set(this.selectedRuleNames, index, this.selectedRuleNames[index + 1]);
			Vue.set(this.selectedRuleNames, index + 1, goingDown);
		},
		moveLanguageUp(index) {
			const goingUp = this.selectedLanguageKeys[index];
			Vue.set(this.selectedLanguageKeys, index, this.selectedLanguageKeys[index - 1]);
			Vue.set(this.selectedLanguageKeys, index - 1, goingUp);
		},
		moveLanguageDown(index) {
			const goingDown = this.selectedLanguageKeys[index];
			Vue.set(this.selectedLanguageKeys, index, this.selectedLanguageKeys[index + 1]);
			Vue.set(this.selectedLanguageKeys, index + 1, goingDown);
		},
	},
};

new Vue({
	render: (h) => h(content),
}).$mount('#app');
