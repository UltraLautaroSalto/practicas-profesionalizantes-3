class WCLoginFormView extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

<div class="w3-white w3-round w3-margin-bottom w3-border">

    <div class="w3-padding-large">

        <div class="w3-center w3-padding-16">
            <img src="./assets/admin-logo.png"
                 class="w3-image">

            <p>SIGN IN</p>
        </div>

        <div class="w3-margin-bottom">
            <input
                id="username"
                type="text"
                class="w3-input w3-round w3-border"
                placeholder="Enter Username">
        </div>

        <div class="w3-margin-bottom">
            <input
                id="password"
                type="password"
                class="w3-input w3-round w3-border"
                placeholder="Enter Password">
        </div>

        <div class="w3-margin-bottom">

            <input
                id="user-checkbox"
                class="w3-check"
                type="checkbox"
                checked>

            <label for="user-checkbox">
                I AGREE WITH TERMS & CONDITIONS
            </label>

        </div>

        <button
            id="btnLogin"
            class="w3-button
                   w3-round
                   w3-margin-bottom
                   w3-primary
                   w3-block">

            Sign In

        </button>

        <div class="w3-center w3-margin-bottom w3-opacity">
            Sign In With
        </div>

        <div class="w3-row-padding w3-stretch">

            <div class="w3-col m6">

                <button
                    class="w3-button
                           w3-round
                           w3-margin-bottom
                           bg-facebook
                           w3-text-white
                           w3-block">

                    <i class="fa fa-facebook-square"></i>

                    Facebook

                </button>

            </div>

            <div class="w3-col m6">

                <button
                    class="w3-button
                           w3-round
                           w3-margin-bottom
                           bg-twitter
                           w3-text-white
                           w3-block">

                    <i class="fa fa-twitter-square"></i>

                    Twitter

                </button>

            </div>

        </div>

    </div>

    <div class="w3-center w3-border-top">

        <p class="w3-margin">

            <span class="w3-text-warning">

                Do not have an account?

            </span>

            <a href="register.html">

                Sign Up here

            </a>

        </p>

    </div>

</div>

        `;

    }

}

customElements.define(
    "wc-login-form-view",
    WCLoginFormView
);