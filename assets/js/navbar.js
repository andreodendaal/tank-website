function createNavBar() {
    const navBarHTML = `
        <nav class="navbar">
            <div class="nav-left">
                <ul class="menu">
                    <li class="menu-item"><a href="index.html">Home</a></li> <!-- Home link added -->
                    <li class="menu-item"><a href="childhood.html">Childhood</a></li>
                    <li class="menu-item"><a href="ww2.html">World War 2</a>
                        <ul class="submenu">
                            <li><a href="ww2.html#escape_evasion">Escape and Evasion</a></li>
                            <li><a href="ww2.html#monte_cassino">Monte Cassino</a></li>
                            <li><a href="ww2.html#venice_harbor">Venice Harbor</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="personal_life.html">Personal Life</a>
                        <ul class="submenu">
                            <li><a href="#">Sport</a></li>
                            <li><a href="#">Dogs</a></li>
                        </ul>
                    </li>
                    <li class="menu-item"><a href="family.html">Family</a>
                        <ul class="submenu">
                            <li><a href="family.html#joy_text">Joy Odendaal</a></li>
                            <li><a href="family.html#sons">Sons</a></li>                       </ul>
                    </li>
                    <li class="menu-item"><a href="about.html">About</a>
                        <ul class="submenu">
                            <li><a href="catalog_admin.html" target="_blank">Admin</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="nav-right">
                <input type="text" placeholder="Search..." id="searchInput">
                <button onclick="performSearch()">Search</button>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navBarHTML);
}
