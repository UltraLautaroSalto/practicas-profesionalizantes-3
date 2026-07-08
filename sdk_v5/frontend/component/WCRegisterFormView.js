class WCRegisterFormView extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `

<div class="w3-white w3-round w3-margin-bottom w3-border">

    <header
        class="w3-padding-large
               w3-large
               w3-border-bottom"
        style="font-weight:500">

        HORIZONTAL FORM

    </header>

    <div class="w3-padding-large">

        <form>

            <div class="w3-row w3-margin-bottom">

                <label class="w3-col l2">
                    Name
                </label>

                <div class="w3-col l10">

                    <input
                        type="text"
                        class="w3-input w3-border w3-round"
                        placeholder="Enter Your Name">

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <label class="w3-col l2">
                    Email
                </label>

                <div class="w3-col l10">

                    <input
                        type="text"
                        class="w3-input w3-border w3-round"
                        placeholder="Enter Your Email Address">

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <label class="w3-col l2">
                    Mobile Number
                </label>

                <div class="w3-col l10">

                    <input
                        type="text"
                        class="w3-input w3-border w3-round"
                        placeholder="Enter Your Mobile Number">

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <label class="w3-col l2">
                    Password
                </label>

                <div class="w3-col l10">

                    <input
                        type="password"
                        class="w3-input w3-border w3-round"
                        placeholder="Enter Password">

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <label class="w3-col l2">
                    Confirm Password
                </label>

                <div class="w3-col l10">

                    <input
                        type="password"
                        class="w3-input w3-border w3-round"
                        placeholder="Confirm Password">

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <div class="w3-col l2"></div>

                <div class="w3-col l10">

                    <label>

                        <input
                            type="checkbox"
                            class="w3-check"
                            checked>

                        I Agree Terms & Conditions

                    </label>

                </div>

            </div>


            <div class="w3-row w3-margin-bottom">

                <div class="w3-col l2"></div>

                <div class="w3-col l10">

                    <button
                        type="button"
                        class="w3-button w3-primary w3-round">

                        <i class="fa fa-fw fa-lock"></i>

                        Register

                    </button>

                </div>

            </div>

        </form>

    </div>

</div>

`;

    }

}

customElements.define(
    "wc-register-form-view",
    WCRegisterFormView
);