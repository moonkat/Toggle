// Requires jquery.js
$(document).ready(function(){
	/**
	 * Toggle / Toggle Control
	 * 
	 * Creates a toggle on an element.  If toggle control tags are set, create an element and alternate between control classes.
	 * @example
	 * <.. toggle="myElementId"> - will alternately show and hide myElementId on click
	 * <.. toggle="myElementId" toggleViewClass="minus" toggleHideClass="plus"> - will create an element that will inherit the classes defined in tVC and tHC
	 * <.. toggle="myElementId" toggleViewClass="minus" toggleHideClass="plus" toggleElement="div"> - toggleElement defines which type of element will be created for the toggle controls (default: span)
	 * @todo Check to make sure that the find function will work properly with nested toggle controls.  Element selection may not be specific enough.
	 * 
	 */
	var toggleTag 				= "toggle";
	var toggleSelector 			= "[toggle]";
	var toggleViewClassTag 		= "toggleViewClass";
	var toggleHideClassTag 		= "toggleHideClass";
	var toggleViewClassSelector 	= "[toggleViewClass]";
	var toggleHideClassSelector 	= "[toggleHideClass]";
	var toggleElementTag 		= "toggleControlElement";
	$(toggleSelector).each(function(){
		// toggle control functionality
		var viewClass = $(this).attr(toggleViewClassTag);
		var hideClass = $(this).attr(toggleHideClassTag);
		var elementType = $(this).attr(toggleElementTag) || "span"; // if elementType is specified, use it, otherwise make a span by default
		// if both tVC, and tHC are set, then we have a toggle control.  Create accordingly
		if (viewClass && hideClass) {
			// if there is no child toggle control, create it
			if ($("[tt]='" + $(this).attr(toggleTag) + "'").attr('tt') != $(this).attr(toggleTag)) {  // common sense would say that this would always return false, but it doesn't.  I think there is something wrong with attribute selectors in jQuery 1.3
				$(this).prepend("<" + elementType + " tt='" + $(this).attr(toggleTag) + "'></" + elementType + ">"); // add control element
				$(this).children("[tt]='" + $(this).attr(toggleTag) + "'").css('cursor', 'pointer'); // make it look clickable
				// this sets up the control element.  if the target is hidden, show hideClass.  if not, show showClass.
				$("#" + $(this).attr(toggleTag)).css('display') == 'none' ? $(this).children("[tt]='" + $(this).attr(toggleTag) + "'").addClass(hideClass) : $(this).children("[tt]='" + $(this).attr(toggleTag) + "'").addClass(viewClass);
			}
			// set click handler on control element.
			$(this).children("[tt]='" + $(this).attr(toggleTag) + "'").click(function(){
				// toggle control
				$("#" + $(this).parent().attr(toggleTag)).css('display') == 'none' ? $(this).removeClass(hideClass).addClass(viewClass) : $(this).removeClass(viewClass).addClass(hideClass)
				// toggle target
				$("#" + $(this).parent().attr(toggleTag)).toggle();
			});
		} else { // if no toggle control is specified, use the calling element as the toggle control element
			$(this).css('cursor', 'pointer'); // make it look clickable
			$(this).click(function(){
				$( "#" + $(this).attr(toggleTag) ).toggle();
			});
		}
    }); 
    
});