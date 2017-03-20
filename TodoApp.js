var TodoApp = (function () { 'use strict';

function renderMainFragment ( root, component ) {
	var h1 = createElement( 'h1' );
	
	appendNode( createText( "To do App" ), h1 );
	var text1 = createText( "\n\n" );
	
	var input = createElement( 'input' );
	
	var input_updating = false;
	
	function inputChangeHandler () {
		input_updating = true;
		component._set({ newTodo: input.value });
		input_updating = false;
	}
	
	addEventListener( input, 'input', inputChangeHandler );
	
	input.placeholder = "enter a new Todo";
	
	input.__svelte = {
		root: root
	};
	
	input.value = root.newTodo;
	
	var text2 = createText( "\n\n" );
	
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		
		component.set({todos: root.todos.concat(root.newTodo), newTodo: ""});
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.__svelte = {
		root: root
	};
	
	appendNode( createText( "Add a new Todo!" ), button );
	var text4 = createText( "\n\n" );
	
	var ul = createElement( 'ul' );
	
	var eachBlock_anchor = createComment();
	appendNode( eachBlock_anchor, ul );
	var eachBlock_value = root.todos;
	var eachBlock_iterations = [];
	
	for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
		eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
		eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
	}
	
	var text5 = createText( "\n\n" );
	var ifBlock_anchor = createComment();
	
	function getBlock ( root ) {
		if ( root.todos.length !== 0 ) return renderIfBlock_0;
		return null;
	}
	
	var currentBlock = getBlock( root );
	var ifBlock = currentBlock && currentBlock( root, component );

	return {
		mount: function ( target, anchor ) {
			insertNode( h1, target, anchor );
			insertNode( text1, target, anchor );
			insertNode( input, target, anchor );
			insertNode( text2, target, anchor );
			insertNode( button, target, anchor );
			insertNode( text4, target, anchor );
			insertNode( ul, target, anchor );
			insertNode( text5, target, anchor );
			insertNode( ifBlock_anchor, target, anchor );
			if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
		},
		
		update: function ( changed, root ) {
			var __tmp;
		
			if ( !input_updating ) {
				input.value = root.newTodo;
			}
			
			input.__svelte.root = root;
			
			button.__svelte.root = root;
			
			var eachBlock_value = root.todos;
			
			for ( var i = 0; i < eachBlock_value.length; i += 1 ) {
				if ( !eachBlock_iterations[i] ) {
					eachBlock_iterations[i] = renderEachBlock( root, eachBlock_value, eachBlock_value[i], i, component );
					eachBlock_iterations[i].mount( eachBlock_anchor.parentNode, eachBlock_anchor );
				} else {
					eachBlock_iterations[i].update( changed, root, eachBlock_value, eachBlock_value[i], i );
				}
			}
			
			teardownEach( eachBlock_iterations, true, eachBlock_value.length );
			
			eachBlock_iterations.length = eachBlock_value.length;
			
			var _currentBlock = currentBlock;
			currentBlock = getBlock( root );
			if ( _currentBlock === currentBlock && ifBlock) {
				ifBlock.update( changed, root );
			} else {
				if ( ifBlock ) ifBlock.teardown( true );
				ifBlock = currentBlock && currentBlock( root, component );
				if ( ifBlock ) ifBlock.mount( ifBlock_anchor.parentNode, ifBlock_anchor );
			}
		},
		
		teardown: function ( detach ) {
			removeEventListener( input, 'input', inputChangeHandler );
			removeEventListener( button, 'click', clickHandler );
			
			teardownEach( eachBlock_iterations, false );
			
			if ( ifBlock ) ifBlock.teardown( detach );
			
			if ( detach ) {
				detachNode( h1 );
				detachNode( text1 );
				detachNode( input );
				detachNode( text2 );
				detachNode( button );
				detachNode( text4 );
				detachNode( ul );
				detachNode( text5 );
				detachNode( ifBlock_anchor );
			}
		}
	};
}

function renderIfBlock_0 ( root, component ) {
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		component.set({todos: [], newTodo: ""});
	}
	
	addEventListener( button, 'click', clickHandler );
	
	appendNode( createText( "Clear All" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( button, target, anchor );
		},
		
		update: noop,
		
		teardown: function ( detach ) {
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( button );
			}
		}
	};
}

function renderEachBlock ( root, eachBlock_value, todo, index, component ) {
	var li = createElement( 'li' );
	
	var span = createElement( 'span' );
	
	appendNode( span, li );
	var last_text = todo
	var text = createText( last_text );
	appendNode( text, span );
	appendNode( createText( "\n\n      " ), li );
	
	var button = createElement( 'button' );
	
	function clickHandler ( event ) {
		var root = this.__svelte.root;
		var eachBlock_value = this.__svelte.eachBlock_value, index = this.__svelte.index, todo = eachBlock_value[index]
		
		component.set({ todos: root.todos.slice(0, index).concat(root.todos.slice(index + 1)) });
	}
	
	addEventListener( button, 'click', clickHandler );
	
	button.__svelte = {
		root: root,
		eachBlock_value: eachBlock_value,
		index: index
	};
	
	appendNode( button, li );
	appendNode( createText( "Done" ), button );

	return {
		mount: function ( target, anchor ) {
			insertNode( li, target, anchor );
		},
		
		update: function ( changed, root, eachBlock_value, todo, index ) {
			var __tmp;
		
			if ( ( __tmp = todo ) !== last_text ) {
				text.data = last_text = __tmp;
			}
			
			button.__svelte.root = root;
			button.__svelte.eachBlock_value = eachBlock_value;
			button.__svelte.index = index;
		},
		
		teardown: function ( detach ) {
			removeEventListener( button, 'click', clickHandler );
			
			if ( detach ) {
				detachNode( li );
			}
		}
	};
}

function TodoApp ( options ) {
	options = options || {};
	this._state = options.data || {};
	
	this._observers = {
		pre: Object.create( null ),
		post: Object.create( null )
	};
	
	this._handlers = Object.create( null );
	
	this._root = options._root;
	this._yield = options._yield;
	
	this._torndown = false;
	
	this._fragment = renderMainFragment( this._state, this );
	if ( options.target ) this._fragment.mount( options.target, null );
}

TodoApp.prototype.get = get;
TodoApp.prototype.fire = fire;
TodoApp.prototype.observe = observe;
TodoApp.prototype.on = on;
TodoApp.prototype.set = set;
TodoApp.prototype._flush = _flush;

TodoApp.prototype._set = function _set ( newState ) {
	var oldState = this._state;
	this._state = Object.assign( {}, oldState, newState );
	
	dispatchObservers( this, this._observers.pre, newState, oldState );
	if ( this._fragment ) this._fragment.update( newState, this._state );
	dispatchObservers( this, this._observers.post, newState, oldState );
};

TodoApp.prototype.teardown = TodoApp.prototype.destroy = function destroy ( detach ) {
	this.fire( 'destroy' );

	this._fragment.teardown( detach !== false );
	this._fragment = null;

	this._state = {};
	this._torndown = true;
};

function createElement( name ) {
	return document.createElement( name );
}

function detachNode( node ) {
	node.parentNode.removeChild( node );
}

function insertNode( node, target, anchor ) {
	target.insertBefore( node, anchor );
}

function createText( data ) {
	return document.createTextNode( data );
}

function appendNode( node, target ) {
	target.appendChild( node );
}

function addEventListener( node, event, handler ) {
	node.addEventListener ( event, handler, false );
}

function removeEventListener( node, event, handler ) {
	node.removeEventListener ( event, handler, false );
}

function createComment() {
	return document.createComment( '' );
}

function teardownEach( iterations, detach, start ) {
	for ( var i = ( start || 0 ); i < iterations.length; i += 1 ) {
		iterations[i].teardown( detach );
	}
}

function noop() {}

function dispatchObservers( component, group, newState, oldState ) {
	for ( var key in group ) {
		if ( !( key in newState ) ) continue;

		var newValue = newState[ key ];
		var oldValue = oldState[ key ];

		if ( newValue === oldValue && typeof newValue !== 'object' ) continue;

		var callbacks = group[ key ];
		if ( !callbacks ) continue;

		for ( var i = 0; i < callbacks.length; i += 1 ) {
			var callback = callbacks[i];
			if ( callback.__calling ) continue;

			callback.__calling = true;
			callback.call( component, newValue, oldValue );
			callback.__calling = false;
		}
	}
}

function get( key ) {
	return key ? this._state[ key ] : this._state;
}

function fire( eventName, data ) {
	var handlers = eventName in this._handlers && this._handlers[ eventName ].slice();
	if ( !handlers ) return;

	for ( var i = 0; i < handlers.length; i += 1 ) {
		handlers[i].call( this, data );
	}
}

function observe( key, callback, options ) {
	var group = ( options && options.defer ) ? this._observers.pre : this._observers.post;

	( group[ key ] || ( group[ key ] = [] ) ).push( callback );

	if ( !options || options.init !== false ) {
		callback.__calling = true;
		callback.call( this, this._state[ key ] );
		callback.__calling = false;
	}

	return {
		cancel: function () {
			var index = group[ key ].indexOf( callback );
			if ( ~index ) group[ key ].splice( index, 1 );
		}
	};
}

function on( eventName, handler ) {
	if ( eventName === 'teardown' ) return this.on( 'destroy', handler );

	var handlers = this._handlers[ eventName ] || ( this._handlers[ eventName ] = [] );
	handlers.push( handler );

	return {
		cancel: function () {
			var index = handlers.indexOf( handler );
			if ( ~index ) handlers.splice( index, 1 );
		}
	};
}

function set( newState ) {
	this._set( newState );
	( this._root || this )._flush();
}

function _flush() {
	if ( !this._renderHooks ) return;

	while ( this._renderHooks.length ) {
		var hook = this._renderHooks.pop();
		hook.fn.call( hook.context );
	}
}

return TodoApp;

}());