function setStorage(){
	var todolist = document.getElementById("rev").innerHTML;
	var completelist = document.getElementById("comple").innerHTML;
	localStorage.setItem('todo', todolist)
	localStorage.setItem('complete', completelist)
	// console.log(document.getElementById("comple"))
    

}
function getStorage(){
	 // localStorage.removeItem('todo');
  //   localStorage.removeItem('complete');
	if(localStorage.length !== 0){
		
		var todo1 = localStorage.getItem('todo')
		document.getElementById("rev").innerHTML = todo1;
		
		var complete1 = localStorage.getItem('complete')
		 document.getElementById("comple").innerHTML = complete1;
	}

}

function countitems() {
	var count = $("#rev").children().length
	$("#item-count").html(count)
	setStorage();
}

function addTodolist(message) {
	$("#comple").append("<li class = 'list-group-item comp' style='display:none;'><input type='checkbox' class='chk'  checked>   " + message + "<span><i id='trash' class='fa fa-trash' ></i></span></li>")
	$("li[style='display:none;']").fadeIn(200)

	setStorage();
}

function revertTodolist(message) {
	$("#rev").append("<li class = 'list-group-item' style='display:none;'><input type='checkbox' class='chk' unchecked>   " + message + "</li>")
	$("li[style='display:none;']").fadeIn(200, function(){
		countitems()
	})
}

$("#checkall").click(function(){
	
  $("input[type='checkbox']").prop('checked', true);
  $("li").each(function() {
  	addTodolist($(this).text())
  	// body...
  	$(this).remove();
  })
  countitems();
});


$("#incomp").click(function(){
	
  $("input[type='checkbox']").prop('unchecked', true);
  $("#comple").children().each(function() {
  	revertTodolist($(this).text())
  	$(this).remove();
  })

  countitems(); 

});

$("#delall").click(function(){
	$("#comple").children().fadeOut(function(){
		$(this).remove();
		setStorage()
	});
	event.stopPropagation();
	
 });


$("body").on("click", "input:checkbox", function(){
    if($(this).is(":checked")){
    	addTodolist($(this).parent().text()); 
    }
    else{
    	revertTodolist($(this).parent().text());
    	
    }
    $(this).parent().fadeOut(function () {
    	// body...
    	$(this).remove()
    	countitems()
    })

});


$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		var todoText = $(this).val();
		$(this).val("");
		revertTodolist(todoText);
		setStorage()
	}
});


$("body").on("click", "#trash", function(event){
	$(this).parent().parent().fadeOut(function(){
		$(this).remove();
		setStorage()
	});
	event.stopPropagation();
	
 });


$(".fa-plus").click(function() {
	// body...
	$("input[type='text'").fadeToggle(); 
});


getStorage();