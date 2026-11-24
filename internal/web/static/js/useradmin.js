// Benutzerverwaltung: Reiter ueber die Sprungmarke (#users, #groups, #login) waehlen und beim Wechsel merken.
(function () {
	"use strict";
	var tabs = document.getElementById("ua-tabs");
	if (!tabs || !window.bootstrap) { return; }
	var show = function () {
		var id = location.hash.replace(/[^a-z]/gi, "");
		var b = id && tabs.querySelector('[data-bs-target="#' + id + '"]');
		if (!b && id) { // Sprungmarke einer Karte (z. B. #ldap): den Reiter zeigen, in dem sie steht
			var el = document.getElementById(decodeURIComponent(location.hash.slice(1))) || document.getElementById(id), pane = el && el.closest(".tab-pane");
			b = pane && tabs.querySelector('[data-bs-target="#' + pane.id + '"]');
		}
		if (b) { bootstrap.Tab.getOrCreateInstance(b).show(); }
	};
	show();
	window.addEventListener("hashchange", show);
	tabs.addEventListener("shown.bs.tab", function (e) {
		var t = e.target.getAttribute("data-bs-target");
		if (t && history.replaceState) { history.replaceState(null, "", location.pathname + t); }
	});
})();
