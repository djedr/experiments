
<script>
let input = document.querySelector('#autocomplete');
let list = document.querySelector('.results');

c.debounce = (ms) => {
	let lastCallTime = 0;
	return (...args) => {
		let currentTime = performance.now();
		if (currentTime - lastCallTime >= ms) {
			lastCallTime = currentTime;
			c.advance(...args);
		}
	};
};

fun({body: c=> [
	_ => input.addEventListener('keyup', c.next),
	c.debounce(250),
	e => e.target.value,
	text => apiUser(text).then(c.next),
	response => response.json().then(c.next),
	data => data.items || [],
	items => {
		list.innerHTML = '';
		
		let fragment = document.createDocumentFragment();
		
		items.forEach((item) => {
			let li = document.createElement('li');
			li.innerText = item.login;
			
			fragment.appendChild(li);
		});
		
		list.appendChild(fragment);
	}
]});

function apiUser(text:String):Promise {
  return fetch('https://api.github.com/search/users?q='+text);
}
</script>
