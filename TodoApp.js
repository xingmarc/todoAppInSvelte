var TodoApp = (function () { 'use strict';

function renderMainFragment ( root, component, target ) {
	var h1 = document.createElement( 'h1' );
	
	var text = document.createTextNode( "To do App" );
	h1.appendChild( text );
	
	target.appendChild( h1 )
	
	var text1 = document.createTextNode( "\n\n" );
	target.appendChild( text1 );
	
	var input = document.createElement( 'input' );
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component.set({ newTodo: input.value });
		input_updating = false;
	}
	
	input.addEventListener( 'input', inputChangeHandler, false );
	input.value = root.newTodo;
	input.placeholder = "enter a new Todo";
	
	target.appendChild( input )
	
	var text2 = document.createTextNode( "\n\n" );
	target.appendChild( text2 );
	
	var button = document.createElement( 'button' );
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.set({todos: root.todos.concat(root.newTodo), newTodo: ''});
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		root: root
	};
	
	var text3 = document.createTextNode( "Add a new Todo!" );
	button.appendChild( text3 );
	
	target.appendChild( button )
	
	var text4 = document.createTextNode( "\n\n" );
	target.appendChild( text4 );
	
	var ul = document.createElement( 'ul' );
	
	var eachBlock_0_anchor = document.createComment( "#each todos" );
	ul.appendChild( eachBlock_0_anchor );
	
	var eachBlock_0_value = root.todos;
	var eachBlock_0_fragment = document.createDocumentFragment();
	var eachBlock_0_iterations = [];
	
	for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
		eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
	}
	
	eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
	
	target.appendChild( ul )
	
	var text5 = document.createTextNode( "\n\n" );
	target.appendChild( text5 );
	
	var ifBlock_0_anchor = document.createComment( "#if todos.length !== 0" );
	target.appendChild( ifBlock_0_anchor );
	
	var ifBlock_0 = root.todos.length !== 0 ? renderIfBlock_0( root, component, target, ifBlock_0_anchor ) : null;

	return {
		update: function ( changed, root ) {
			if ( !input_updating ) input.value = root.newTodo;
			
			button.__svelte.root = root;
			
			var eachBlock_0_value = root.todos;
			
			for ( var i = 0; i < eachBlock_0_value.length; i += 1 ) {
				if ( !eachBlock_0_iterations[i] ) {
					eachBlock_0_iterations[i] = renderEachBlock_0( root, eachBlock_0_value, eachBlock_0_value[i], i, component, eachBlock_0_fragment );
				} else {
					eachBlock_0_iterations[i].update( changed, root, eachBlock_0_value, eachBlock_0_value[i], i );
				}
			}
			
			for ( var i = eachBlock_0_value.length; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( true );
			}
			
			eachBlock_0_anchor.parentNode.insertBefore( eachBlock_0_fragment, eachBlock_0_anchor );
			eachBlock_0_iterations.length = eachBlock_0_value.length;
			
			if ( root.todos.length !== 0 ) {
				if ( !ifBlock_0 ) {
					ifBlock_0 = renderIfBlock_0( root, component, target, ifBlock_0_anchor );
				} else {
					ifBlock_0.update( changed, root );
				}
			}
			
			else {
				if ( ifBlock_0 ) {
					ifBlock_0.teardown( true );
					ifBlock_0 = null;
				}
			}
		},

		teardown: function ( detach ) {
			if ( detach ) h1.parentNode.removeChild( h1 );
			
			text.parentNode.removeChild( text );
			
			text1.parentNode.removeChild( text1 );
			
			input.removeEventListener( 'input', inputChangeHandler, false );
			if ( detach ) input.parentNode.removeChild( input );
			
			text2.parentNode.removeChild( text2 );
			
			button.removeEventListener( 'click', clickHandler, false );
			if ( detach ) button.parentNode.removeChild( button );
			
			text3.parentNode.removeChild( text3 );
			
			text4.parentNode.removeChild( text4 );
			
			if ( detach ) ul.parentNode.removeChild( ul );
			
			for ( let i = 0; i < eachBlock_0_iterations.length; i += 1 ) {
				eachBlock_0_iterations[i].teardown( detach );
			}
			
			if ( detach ) eachBlock_0_anchor.parentNode.removeChild( eachBlock_0_anchor );
			
			text5.parentNode.removeChild( text5 );
			
			if ( ifBlock_0 ) ifBlock_0.teardown( detach );
			if ( detach ) ifBlock_0_anchor.parentNode.removeChild( ifBlock_0_anchor );
		}
	};
}

function renderIfBlock_0 ( root, component, target, anchor ) {
	var button = document.createElement( 'button' );
	function clickHandler ( event ) {
		component.set({todos: [], newTodo: ''});
	}
	
	button.addEventListener( 'click', clickHandler, false );
	
	var text = document.createTextNode( "Clear All" );
	button.appendChild( text );
	
	anchor.parentNode.insertBefore( button, anchor )

	return {
		update: function ( changed, root ) {
			
		},

		teardown: function ( detach ) {
			button.removeEventListener( 'click', clickHandler, false );
			if ( detach ) button.parentNode.removeChild( button );
			
			text.parentNode.removeChild( text );
		}
	};
}

function renderEachBlock_0 ( root, eachBlock_0_value, todo, index, component, target ) {
	var li = document.createElement( 'li' );
	
	var span = document.createElement( 'span' );
	
	var text = document.createTextNode( todo );
	span.appendChild( text );
	
	li.appendChild( span )
	
	var text1 = document.createTextNode( "\n\n      " );
	li.appendChild( text1 );
	
	var button = document.createElement( 'button' );
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		var eachBlock_0_value = this.__svelte.eachBlock_0_value, index = this.__svelte.index, todo = eachBlock_0_value[index]
		
		component.set({todos: root.todos.slice(0, index).concat(root.todos.slice(index + 1))});
	}
	
	button.addEventListener( 'click', clickHandler, false );
	button.__svelte = {
		root: root,
		eachBlock_0_value: eachBlock_0_value,
		index: index
	};
	
	var text2 = document.createTextNode( "Done" );
	button.appendChild( text2 );
	
	li.appendChild( button )
	
	target.appendChild( li )

	return {
		update: function ( changed, root, eachBlock_0_value, todo, index ) {
			var todo = eachBlock_0_value[index];
			
			text.data = todo;
			
			button.__svelte.root = root;
			button.__svelte.eachBlock_0_value = eachBlock_0_value;
			button.__svelte.index = index;
		},

		teardown: function ( detach ) {
			if ( detach ) li.parentNode.removeChild( li );
			
			
			
			text1.parentNode.removeChild( text1 );
			
			button.removeEventListener( 'click', clickHandler, false );
			
			text2.parentNode.removeChild( text2 );
		}
	};
}

function TodoApp ( options ) {
	var component = this;
	var state = options.data || {};

	var observers = {
		immediate: Object.create( null ),
		deferred: Object.create( null )
	};

	var callbacks = Object.create( null );

	function dispatchObservers ( group, newState, oldState ) {
		for ( const key in group ) {
			if ( !( key in newState ) ) continue;

			const newValue = newState[ key ];
			const oldValue = oldState[ key ];

			if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

			const callbacks = group[ key ];
			if ( !callbacks ) continue;

			for ( let i = 0; i < callbacks.length; i += 1 ) {
				const callback = callbacks[i];
				if ( callback.__calling ) continue;

				callback.__calling = true;
				callback.call( component, newValue, oldValue );
				callback.__calling = false;
			}
		}
	}

	this.fire = function fire ( eventName, data ) {
		var handlers = eventName in callbacks && callbacks[ eventName ].slice();
		if ( !handlers ) return;

		for ( var i = 0; i < handlers.length; i += 1 ) {
			handlers[i].call( this, data );
		}
	};

	this.get = function get ( key ) {
		return state[ key ];
	};

	this.set = function set ( newState ) {
		const oldState = state;
		state = Object.assign( {}, oldState, newState );
		
		dispatchObservers( observers.immediate, newState, oldState );
		if ( mainFragment ) mainFragment.update( newState, state );
		dispatchObservers( observers.deferred, newState, oldState );
	};

	this.observe = function ( key, callback, options = {} ) {
		const group = options.defer ? observers.deferred : observers.immediate;

		( group[ key ] || ( group[ key ] = [] ) ).push( callback );

		if ( options.init !== false ) {
			callback.__calling = true;
			callback.call( component, state[ key ] );
			callback.__calling = false;
		}

		return {
			cancel () {
				const index = group[ key ].indexOf( callback );
				if ( ~index ) group[ key ].splice( index, 1 );
			}
		};
	};

	this.on = function on ( eventName, handler ) {
		const handlers = callbacks[ eventName ] || ( callbacks[ eventName ] = [] );
		handlers.push( handler );

		return {
			cancel: function () {
				const index = handlers.indexOf( handler );
				if ( ~index ) handlers.splice( index, 1 );
			}
		};
	};

	this.teardown = function teardown ( detach ) {
		this.fire( 'teardown' );

		mainFragment.teardown( detach !== false );
		mainFragment = null;

		state = {};
	};

	var mainFragment = renderMainFragment( state, this, options.target );
}

return TodoApp;

}());