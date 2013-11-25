var cart = {
	name: null,
    address1: null,
    zip: null,
    phone: null,
    items: [] //empty array
}; //cart data

$(function() {
	renderPizzas();
	renderDrinks();      
	renderDesserts();

	$('.add-pizza').click(addPizza);
	$('.add-other').click(addOther);
	$('.order-button').click(order);
	$('.remove-button').click(remove);
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
	    instance.removeClass('hide');
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
    	instance.find('form').attr('name',drink.name);
    	instance.find('.drink-name').html(drink.name + ' ');
    	instance.find('.drink-price').html('$' + drink.price);
    	instance.find('.add-other').attr('price',drink.price);
    	instance.find('.add-other').attr('name',drink.name);
    	instance.removeClass('drink-template');
    	instance.removeClass('hide');
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
    	instance.find('form').attr('name',dessert.name);
    	instance.find('.dessert-name').html(dessert.name + ' ');
    	instance.find('.dessert-price').html('$' + dessert.price);
    	instance.find('.add-other').attr('price',dessert.price);
    	instance.find('.add-other').attr('name',dessert.name);
    	instance.removeClass('dessert-template');
    	instance.removeClass('hide');
    	$('.desserts').append(instance);
	} 
}

function addPizza() {
	var name = this.getAttribute('name');
	var newCartItem = {
		type: this.getAttribute('item-type'),
		name: name,
		size: $("form[name='" + name + "'] .size :selected").attr('id'),
		price: $("form[name='" + name + "'] .size").val(),
		quantity: $("form[name='" + name + "'] .quantity").val()
	}
	cart.items.push(newCartItem);
	renderCart(cart);
	$('.order-button').removeClass('hide');
	$('.totals').removeClass('hide');
}

function addOther() {
	var name = this.getAttribute('name');
	var newCartItem = {
		type: this.getAttribute('item-type'),
		name: name,
		size: ' ',
		price: this.getAttribute('price'),
		quantity: $("form[name='" + name + "'] .quantity").val()
	}
	cart.items.push(newCartItem);
	renderCart(cart);
	$('.order-button').removeClass('hide');
	$('.totals').removeClass('hide');
}

function renderCart(cart) {
	var idx;
	var item;
	var instance;
	var template = $('.item-template')
	var subtotal = 0;
	$('.cart-container').empty();
	for (idx = 0; idx < cart.items.length; idx++) {
		item = cart.items[idx];
		instance=template.clone();
		instance.find('.item-info').prepend(
				item.quantity + ' ' +
				item.size + ' ' +
				item.name
		);
		var price = parseInt(item.price) * item.quantity;
		instance.find('.item-price').html('$' + price.toFixed(2));
		instance.find('.remove-button').attr('index', idx);
		subtotal += price;
		instance.removeClass('item-template');
    	instance.removeClass('hide');
    	$('.cart-container').append(instance);
	}
	$('.subtotal').html('Subtotal: ' + '<span class=total-price>$' + subtotal.toFixed(2) + '</span>');
	var tax = (.095 * subtotal);
	$('.tax').html('Tax: <span class=total-price>$' + tax.toFixed(2) + '</span>');
	var total = subtotal + tax;
	$('.total').html('Total: <span class=total-price> $' + total.toFixed(2) + '</span>');
}

function order() {
	alert('order');
}

function remove() {
	alert('remove');
	var index = this.getAttribute('index');
	cart.items.splice(index, 1);
	renderCart(cart);	
}