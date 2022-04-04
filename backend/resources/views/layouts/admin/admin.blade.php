<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap"
        rel="stylesheet">
    @yield('style')
</head>

<body>
    <div class="main-body">
        <!-- Desktop Screen -->
        <div id="sidebar-menu" class="sidebar-menu hide-mobile">
            <div class="brand-name">
                <h3>WishTrax</h3>
                <a class="d-inline-block" href="#" onclick="openSidebar()">
                    <img src="{{ asset('images/toggle.png') }}" class="img-fluid" width="20px">
                </a>
            </div>
            <div class="sidebar-menu-inner">
                <div class="menu-items">
                    <a href="index.html" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Product</span></a>
                    <a href="feedback.html" class="theme-color1"> <i class="fa fa-address-book-o"
                            aria-hidden="true"></i>
                        &nbsp;<span>Feedback</span> </a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Audit</span></a>
                </div>
                <div class="menu-items">
                    <h2 class="pb-3">Community Garden</h2>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Summmary</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Project Details</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Category</span></a>
                </div>
                <div class="menu-items">
                    <h2 class="pb-3">Segments</h2>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Summmary</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Project Details</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Category</span></a>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="sidebar-menu-mobile" class="sidebar-menu hide-desktop">
            <div class="brand-name">
                <h3>WishTrax</h3>
                <a class="hide-mobile" href="#" onclick="openSidebarMobile()">
                    <img src="{{ asset('images/toggle.png') }}" class="img-fluid" width="20px">
                </a>
                <a class="close-mobile-menu" href="#" onclick="closeSidebarMobile()">
                    <i class="fa fa-times" aria-hidden="true"></i>
                </a>
            </div>
            <div class="sidebar-menu-inner">
                <div class="menu-items">
                    <a href="index.html" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Product</span></a>
                    <a href="feedback.html" class="theme-color1"> <i class="fa fa-address-book-o"
                            aria-hidden="true"></i>
                        &nbsp;<span>Feedback</span> </a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Audit</span></a>
                </div>
                <div class="menu-items">
                    <h2 class="pb-3">Community Garden</h2>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Summmary</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Project Details</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Category</span></a>
                </div>
                <div class="menu-items">
                    <h2 class="pb-3">Segments</h2>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Summmary</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Project Details</span></a>
                    <a href="#" class="theme-color1"> <i class="fa fa-address-book-o" aria-hidden="true"></i>
                        &nbsp;<span>Category</span></a>
                </div>
            </div>
        </div>

        <div class="body-wrapper" id="body-content">
            <nav class="bg-red">
                <div class="container">
                    <div class="d-flex justify-content-between py-3 align-items-center">
                        <div class="title-bar">
                            <a class="mobile-menu-icon" href="#" onclick="openSidebarMobile()">
                                <img src="{{ asset('images/toggle.png') }}" class="img-fluid" width="20px">
                            </a>
                            <span class="nav-title text-white font-lg-18 pl-3">AmeriCorps *Delaware </span>
                        </div>
                        <div id="navbar-custom">
                            <ul class="d-flex justify-content-center align-items-center mb-0">
                                <li class="nav-item pl-lg-4 pr-2">
                                    <a class="account-name d-inline-block" href="#">
                                        <i class="fa fa-user-circle" aria-hidden="true"></i>
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
            <section class="body-content-inner">
                <div class="container">
                    
                    @yield('content')
                
                </div>
            </section>
        </div>

    </div>


    @yield('scripts')
    <script>
        var open_sidebar = true;
        function openSidebar() {
            if (open_sidebar == false) {
                document.getElementById("sidebar-menu").style.width = "300px";
                document.getElementById("body-content").style.marginLeft = "300px";
                document.getElementById("sidebar-menu").classList.remove("remove-sidebar-text");
                open_sidebar = true;
            } else {
                document.getElementById("sidebar-menu").classList.add("remove-sidebar-text");
                document.getElementById("sidebar-menu").style.width = "80px";
                document.getElementById("body-content").style.marginLeft = "80px";
                open_sidebar = false;
            }
        }
    </script>
    <script>
        function openSidebarMobile() {
            document.getElementById("sidebar-menu-mobile").style.width = "300px";
            document.getElementById("body-content").style.marginLeft = "300px";
        }

        function closeSidebarMobile() {
            document.getElementById("sidebar-menu-mobile").style.width = "0";
            document.getElementById("body-content").style.marginLeft = "0";
        }
    </script>

</body>

</html>