items => {
	c.fragment = document.createDocumentFragment();
	c.next(items);
},
items => c.next(items.forEach(item => {
	let li = document.createElement('li');
	if (item.login) li.innerText = item.login;
	else {
		li.innerText = item.message;
		li.style.color = 'red';
	}

	c.fragment.appendChild(li);
})),
_ => {
	list.innerHTML = '';
	list.appendChild(s.fragment);
}
