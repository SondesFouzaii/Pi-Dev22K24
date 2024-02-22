/*
Template Name: VIDOE - Video Streaming Website HTML Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 1.0
*/
(function($) {
  "use strict"; // Start of use strict

  // Function to toggle the sidebar
  function toggleSidebar() {
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  }

  // Toggle the side navigation
  $(document).on('click', '#sidebarToggle', function(e) {  
    e.preventDefault();
    toggleSidebar();
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
          delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Function to remove modal backdrop shadow
  function removeModalBackdropShadow() {
    $('.modal-backdrop').removeClass('modal-backdrop');
  }

  // Click event listener for the cancel button
  $(document).on('click', '#cancel', function(e) {
    e.preventDefault();
    removeModalBackdropShadow();
  });

  // Other code...
  
})(jQuery); // End of use strict