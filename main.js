const addIcon = document.getElementById("add-icon");
const sortButton = document.getElementById("arrange-select");
const formContainer = document.getElementById("form-container");
const form = document.getElementById("form");
const submitButton = document.getElementById("submit-button");

const colors = [
	"linear-gradient(mediumslateblue,black)",
	"linear-gradient(red, black)",
	"linear-gradient(purple ,60%,black)",
	"linear-gradient(gray, black)",
	"linear-gradient(#a8e2dc,  black)",
	"linear-gradient(var(--primary-color), 70%, black)",
	"FICTION",
	"ROMANCE",
	"HORROR",
	"MYSTERY",
	"SCI-FI",
	"OTHERS",
];

function AddBook(bookName, authorName, noOfPages, read, bookGenre) {
	this.bookId = "";
	this.bookName = bookName;
	this.authorName = authorName;
	this.noOfPages = noOfPages;
	this.read = read;
	this.bookGenre = bookGenre;
	this.readBox = "";
	this.readMark = "";
	this.readButton = "";
	this.card = "";
	this.addId = "";
}

AddBook.prototype.readStatus = function () {
	if (this.read) {
		this.readMark.style.background = "green";
		this.readButton.style.background = "white";
		this.readButton.style.color = "rgb(255, 0, 98)";
		this.readButton.innerText = "Done";
	} else {
		this.readMark.style.background = "red";
		this.readButton.style.background = "rgb(255, 0, 98)";
		this.readButton.style.color = "white";
		this.readButton.innerText = "Read";
	}
};

let myBookList = [];

let book1 = new AddBook(
	"Harry Potter and The Philospher Stone",
	"J K Rowling",
	223,
	false,
	0
);
myBookList.push(book1);

let book2 = new AddBook(
	"Harry Potter and the Chamber of Secrets",
	"J K Rowling",
	251,
	true,
	0
);
myBookList.push(book2);

let book = new AddBook(
	"Harry Potter and the Prisoner of Azkaban",
	"J K Rowling",
	317,
	true,
	0
);
myBookList.push(book);

book = new AddBook(
	"Harry Potter and the Goblet of Fire",
	"J K Rowling",
	640,
	false,
	0
);
myBookList.push(book);

book = new AddBook(
	"Harry Potter and the Order of the Phoneix",
	"J K Rowling",
	816,
	false,
	0
);
myBookList.push(book);

book = new AddBook(
	"Harry Potter and the Half Blood Prince ",
	"J K Rowling",
	607,
	true,
	0
);
myBookList.push(book);

book = new AddBook(
	"Harry Potter and the Deathly Hallows",
	"J K Rowling",
	640,
	false,
	0
);
myBookList.push(book);

function openForm() {
	formContainer.classList.remove("vanish");
	formContainer.classList.add("minimize");
	formContainer.showModal();
	formContainer.classList.add("fade");
}

function changeState() {
	let index = this.getAttribute("data");
	if (myBookList[index].read) myBookList[index].read = false;
	else myBookList[index].read = true;
	myBookList[index].readStatus();
}

function removeCard() {
	const bookSpace = document.getElementById("book-space");
	let card = myBookList[this.getAttribute("data")].card;
	card.classList.add("card-animation");
	card.addEventListener(
		"animationend",
		() => {
			bookSpace.removeChild(card);
			myBookList[this.getAttribute("data")] = "skip";
		},
		{ once: true }
	);
}

function createCard(newBook, index) {
	const bookSpace = document.getElementById("book-space");

	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("data", index);

	const flexCardItem = document.createElement("div");
	flexCardItem.classList.add("flex-card-item");

	const cardMenu = document.createElement("div");
	cardMenu.classList.add("card-menu");

	const readMarkBox = document.createElement("div");
	readMarkBox.classList.add("read-mark-box");

	const readMark = document.createElement("div");
	readMark.classList.add("read-mark");
	readMarkBox.textContent = " hello world";

	const bookInfo = document.createElement("div");
	bookInfo.classList.add("book-info");

	const cardSupText = document.createElement("p");
	cardSupText.classList.add("card-sup-text");

	const cardSubText1 = document.createElement("p");
	cardSubText1.classList.add("card-sub-text");

	const cardSubText2 = document.createElement("p");
	cardSubText2.classList.add("card-sub-text");

	const cardButtonContainer = document.createElement("div");
	cardButtonContainer.classList.add("card-button");

	const cardButton = document.createElement("button");
	cardButton.classList.add("button");
	cardButton.setAttribute("data", index);
	cardButton.setAttribute("id", "card-read-button");

	newBook.bookId = index;
	if (newBook.addId == "") newBook.addId = index;
	newBook.readBox = readMarkBox;
	newBook.readButton = cardButton;
	newBook.readMark = readMark;
	newBook.card = card;
	newBook.readStatus();
	let arr = newBook.readBox.childNodes;
	arr[arr.length - 1].nodeValue =
		" " + colors[6 + Number(newBook.bookGenre)] + " ";

	cardButtonContainer.appendChild(cardButton);

	bookInfo.appendChild(cardSupText);
	bookInfo.appendChild(cardSubText1);
	bookInfo.appendChild(cardSubText2);

	readMarkBox.prepend(readMark);
	cardMenu.appendChild(readMarkBox);
	flexCardItem.appendChild(cardMenu);

	card.appendChild(flexCardItem);
	flexCardItem.appendChild(bookInfo);
	card.appendChild(cardButtonContainer);

	bookSpace.insertBefore(
		card,
		bookSpace.children[bookSpace.children.length - 1]
	);

	cardSubText2.innerText = newBook.noOfPages + " Pages";
	cardSubText1.innerText = newBook.authorName;
	cardSupText.innerText = newBook.bookName;

	let div = document.createElement("div");

	cardMenu.appendChild(div);

	div.outerHTML +=
		'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="close-icon"> <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';

	cardMenu.childNodes[2].setAttribute("data", index);
	cardMenu.childNodes[2].addEventListener("click", removeCard);
	card.style.background = colors[newBook.bookGenre];
	cardButton.addEventListener("click", changeState);
}

function closeForm(e) {
	if (e.target.id == "submit-button") {
		if (!form.checkValidity()) return; //prevent form getting validated
		e.preventDefault(); //stop form submission

		const newBook = new AddBook(
			document.getElementById("book-name").value,
			document.getElementById("author-name").value,
			document.getElementById("no-of-pages").value,
			document.getElementById("completed-or-not").checked,
			document.querySelector('[name="book-genre"]:checked').value
		);
		myBookList.push(newBook);
		createCard(newBook, myBookList.length - 1);
	}

	if (e.target.id != "form-container" && e.target.id != "submit-button") return;

	formContainer.classList.remove("minimize");
	formContainer.classList.add("vanish");
	formContainer.addEventListener(
		"animationend",
		() => {
			formContainer.close();
		},
		{ once: true }
	);
	form.reset();
}

function myBookListLoop() {
	for (let index in myBookList) {
		if (myBookList[index] != "skip") {
			createCard(myBookList[index], index);
		}
	}
}

function sortArray() {
	if (myBookList.length < 1) return;
	document.querySelectorAll(".card").forEach((el) => el.remove());
	myBookList = myBookList.filter((ele) => ele != "skip");
	switch (this.value) {
		case "1":
			myBookList = myBookList.sort(function (a, b) {
				return a.addId - b.addId;
			});
			break;
		case "2":
			myBookList = myBookList.sort(function (a, b) {
				return (
					(a.bookName.toLowerCase() > b.bookName.toLowerCase()) -
					(a.bookName.toLowerCase() < b.bookName.toLowerCase())
				);
			});
			break;
		case "3":
			myBookList = myBookList.sort(function (a, b) {
				return (
					(a.bookName.toLowerCase() < b.bookName.toLowerCase()) -
					(a.bookName.toLowerCase() > b.bookName.toLowerCase())
				);
			});
			break;
		case "4":
			myBookList = myBookList.sort(function (a, b) {
				return a.noOfPages - b.noOfPages;
			});
	}
	myBookListLoop();
	return;
}

sortButton.addEventListener("change", sortArray);
addIcon.addEventListener("click", openForm);
formContainer.addEventListener("click", closeForm);
submitButton.addEventListener("click", closeForm);

myBookListLoop();
