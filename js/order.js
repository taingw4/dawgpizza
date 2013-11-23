
$(function() {
	renderPizzas();
	renderDrinks();      
	renderDesserts();
	var cart = {
    	name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data
	$('.add-pizza').click(addPizza);
	$('.add-other').click(addOther);
	$('.submit').click(order);
});

function renderPizzas() {
	var idx;
	var pizza;
	var instance;
	var template = $('.pizza-template');
	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; idx++) {
	    pizza = com.dawgpizza.menu.pizzas[idx];
	    instance = template.clone();
	    instance.find('.pizza-name').html(pizza.name);
	    instance.find('.pizza-description').html(pizza.description);
	    //instance.find('.pizza-prices').html('$ ' + pizza.prices[0] + ' / ' + pizza.prices[1] + ' / ' + pizza.prices[2]);
	    instance.find('form').attr('name',pizza.name);
	    instance.find('#small').html('Small $' + pizza.prices[0]);
	    instance.find('#medium').html('Medium $' + pizza.prices[1]);
	    instance.find('#large').html('Large $' + pizza.prices[2]);
	    instance.find('#small').val(pizza.prices[0]);
	    instance.find('#medium').val(pizza.prices[1]);
	    instance.find('#large').val(pizza.prices[2]);
	    instance.find('.add-pizza').attr('name',pizza.name);
	    instance.removeClass('pizza-template');
        $('.pizzas').append(instance);
	} 	
	$('.pizza:last-child').empty();
}

function renderDrinks() {
	var idx;
	var drink;
	var instance;
	var template = $('.drink-template');
	for (idx = 0; idx < com.dawgpizza.menu.drinks.length - 1; ++idx) {
    	drink = com.dawgpizza.menu.drinks[idx];
    	instance = template.clone();
    	instance.find('.drink-name').html(drink.name + ' ');
    	instance.find('.drink-price').html('$' + drink.price);
    	instance.find('.quantity').attr('name',drink.name);
    	instance.find('.quantity').attr('price',drink.price);
    	instance.find('.add-other').attr('name',drink.name);
    	instance.removeClass('drink-template');
    	$('.drinks').append(instance);
	} 
}

function renderDesserts() {
	var idx;
	var dessert;
	var instance;
	var template = $('.dessert-template');
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
    	dessert = com.dawgpizza.menu.desserts[idx];
    	instance = template.clone();
    	instance.find('.dessert-name').html(dessert.name + ' ');
    	instance.find('.dessert-price').html('$' + dessert.price);
    	instance.find('.quantity').attr('name',dessert.name);
    	instance.find('.quantity').attr('price',dessert.price);
    	instance.find('.add-other').attr('name',dessert.name);
    	instance.removeClass('dessert-template');
    	$('.desserts').append(instance);
	} 
}

function addPizza() {
	var cart = {
    	name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

	var name = this.getAttribute('name');
	console.log(this.getAttribute('item-type'));
	console.log(name);
	console.log($("form[name='" + name + "'] .size :selected").attr('id'));
	console.log($("form[name='" + name + "'] .size").val());
	console.log($("form[name='" + name + "'] .quantity").val());
	var newCartItem = {
		type: this.getAttribute('item-type'),
		name: name,
		size: $("form[name='" + name + "'] .size :selected").attr('id'),
		price: $("form[name='" + name + "'] .size").val(),
		quantity: $("form[name='" + name + "'] .quantity").val()
	}
	cart.items.push(newCartItem);
	renderCart(cart, $('.cart'));
}

function addOther() {
	var newCartItem = {
		type: $('.quantity').getAttribute('item-type'),
		name: $('.quantity').getAttribute('name'),
		price: $('.quantity').getAttribute('price'),
		quantity: $('.quantity').getAttribute('value')
	}
	cart.items.push(newCartItem);
	renderCart(cart, $('.cart-container'));
}

function renderCart(cart, container) {
	var idx;
	var item;
	var instance;
	var template = $('.cart-template');
	//container.empty();
	for (idx = 0; idx < cart.items.length; idx++) {
		item = cart.items[idx];
		instance = template.clone();
		instance.find('.cart-item').html(item.type + ' ' + item.name + ' ' + item.size + ' ' + item.price + ' ' + item.quantity);
		instance.removeClass('cart-template');
		$('cart-container').append(instance);
	}
}

function order() {

}
