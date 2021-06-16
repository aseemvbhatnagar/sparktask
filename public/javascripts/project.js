$(document).ready(function () {
   
    $('#to').change(function(){
      $('#tname').empty() 
      $('#tbalance').empty() 
      $.getJSON("/bank/fetchname",{userid:$('#to').val()},function(data){
        $.each(data,function(index,item){
            $('#tbalance').val(item.balance)
          $('#tname').val(item.name)
       
     
        })
  
      })
  
  
    })


  });
  