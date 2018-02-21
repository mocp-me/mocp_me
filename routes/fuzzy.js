const relatedSearches = (function (){
	const irregularPlurals = require("irregular-plurals");

	const plurals = (term, relatedTermsArray = [term]) => {
		const irregular = irregularPlurals(term);
		if (irregular) {
			relatedTermsArray.push(irregular);
		} else {
			relatedTermsArray.concat([`${term}s`, `${term}es`]);
		}
		return relatedTermsArray;
	}

	const commonSuffixes = (term, relatedTermsArray = [term]) => {
		const suffixes = ["ed,ing,er,est,y,ly,ment,ness,ity,able,ible,al,ial,ful,en,tion,ation,ition,ion,ic,ive,itive,ative"].split(",");
		relatedTermsArray.concat(suffixes.map(suffix => term + suffix));
		return relatedTermsArray;
	}

})();

module.exports = relatedSearches;