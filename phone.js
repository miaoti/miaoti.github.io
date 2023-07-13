var contacts = [];

function openTab(event, tabName) {
    $(".tabcontent").hide();
    $(".tablink").removeClass("active");

    $("#" + tabName).show();
    $(event.currentTarget).addClass("active");
}



function addDigit(digit) {
    $("#phoneNumber").val(function(i, currentValue) {
        return currentValue + digit;
    });
}

function dialNumber() {
    var phoneNumber = $("#phoneNumber").val();
    console.log("Dialing number:", phoneNumber);
    $("#phoneNumber").val("");
}

function clearInput() {
    $("#phoneNumber").val("");
}

function addContact(event) {
    event.preventDefault();

    var name = $("#name").val();
    var phone = $("#phone").val();
    var email = $("#email").val();

    var contact = {
        name: name,
        phone: phone,
        email: email
    };

    contacts.push(contact);

    clearForm();
    displayContacts();
}

function clearForm() {
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
}

function displayContacts() {
    var contactList = $("#contactList");
    contactList.empty();

    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];

        var contactBox = $("<div>")
            .addClass("contact-box")
            .text(contact.name)
            .click((function(contact) {
                return function() {
                    showContactInfo(contact.name, contact.phone, contact.email);
                };
            })(contact));

        contactList.append(contactBox);
    }
}

function showContactInfo(name, phone, email) {
    var popup = $("<div>").addClass("contact-popup");
    var closeButton = $("<span>")
        .addClass("close-button")
        .html("&times;")
        .click(function() {
            popup.remove();
        });

    var content = $("<div>").addClass("popup-content");
    content.html(
        "<h2>Contact Information</h2><p><strong>Name:</strong> " +
        name +
        "</p><p><strong>Phone:</strong> " +
        phone +
        "</p><p><strong>Email:</strong> " +
        email +
        "</p>"
    );

    popup.append(closeButton);
    popup.append(content);
    $("body").append(popup);
}


$(".tablink").click(function(event) {
    var tabName = $(this).data("tab");
    openTab(event, tabName);
});

$(".key").click(function() {
    var digit = $(this).text();
    addDigit(digit);
});







$(document).ready(function() {
    $("#dialButton").click(dialNumber);
    $("#clearButton").click(clearInput);
    $("#addContactForm").submit(addContact);
    $("#clearFormButton").click(clearForm);
    var startX, startY, isMouseDown = false;

    $("#gesture_area").on("mousedown", function(event) {
        startX = event.pageX;
        startY = event.pageY;
        isMouseDown = true;
        $("#gesture_output").val("mouse down");
    });

    $("#gesture_area").on("mouseup", function(event) {
        if (isMouseDown) {
            isMouseDown = false;
            var endX = event.pageX;
            var endY = event.pageY;
            var deltaX = endX - startX;
            var deltaY = endY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (deltaX < 0) {
                    $("#gesture_output").val("swipe left");
                } else if (deltaX > 0) {
                    $("#gesture_output").val("swipe right");
                }
            } else if(startY<endY){
                $("#gesture_output").val("mouse down");
            }else {
                $("#gesture_output").val("mouse up");
            }
        }
    });


    $(".tablink:eq(0)").click();
});