<template>
    <div class="right" style="">
        <div class="catalogue_container">
            <div class="prog">
                <div class="study_course_catalogue" @click="showContent = !showContent">
                    <span class="study_catalogue_icon hide_catalogue"  v-if="showContent"></span>
                    <span class="study_catalogue_icon show_catalogue"  v-if="!showContent"></span>
                    <p class="study_catalogue_name">课程目录</p>
                </div>

                <div class="mulu-Tab" v-if="showContent">
                    <div class="munu_line"></div>
                    <div class="xu-Line" @click="scrollToTarget()">
                        <div class="preface remove_back">
                        <span :class="['serial_number',notLearned?'':'active_xuhao']">0</span>
                        序言
                        <span :class="['history_lable',notLearned?'':'check_icon_2']"></span>
                        </div>
                    </div>

                    <!--循环显示目录内容-->
                    <div class="xu-Line" v-for="(section, index) in contentSections">
                        <!--一级目录-->
                        <div
                             class="one_level remove_back"
                             style="pointer-events: auto;"
                             v-if="section.type === 'content1'"
                             @click="scrollToTarget(section)"
                        >
                           <span
                               :class="['serial_number',section.notLearned?'':'active_xuhao']"
                               v-text="dealWithNumber(index)"
                           ></span>
                            {{section.markdown}}
                            <span :class="['history_lable',section.notLearned?'':'check_icon']" ></span>
                        </div>



                        <!--二级目录-->
                        <div class="two_level remove_back"
                             style="pointer-events: auto;"
                             v-if="section.type === 'content2'"
                             @click="scrollToTarget(section)"
                        >
                            {{section.markdown}}
                            <span :class="['history_lable',section.notLearned?'':'check_icon_2']"></span>
                        </div>

                        <!--bug辅助-->
                        <div v-if="bugfixed"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Pubsub from 'pubsub-js'

    let number = 0;
    export default {
        name: "rightSideContent",
        data(){
            return {
                showContent: true,
            }
        },
        props:{
            contentSections: Array,
            notLearned: Boolean,
            bugfixed: Boolean,
        },
        beforeUpdate(){
            number = 0;
        },

        methods:{
            dealWithNumber(value){
                var section = this.contentSections[value];
                if (section.type === 'content1'){
                    number += 1;
                }

                return number;
            },

            scrollToTarget(value){
                if (value) {
                    Pubsub.publish('scrollto', 'vlinkpc'+value.id);
                } else {
                    Pubsub.publish('scrollto', 'mainBox');
                }

            },
        }
    }
</script>

<style scoped>
    * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        text-decoration: none;
        margin: 0;
        padding: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .study_course_catalogue:hover {
        cursor: pointer;
    }

    .study_course_catalogue {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin: 2vh 0.5vw 3vh 2.5vw;
        z-index: 9;
    }


    .hide_catalogue {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADIElEQVRoQ+1a4XkTMQzVmwA2ACaATEC7AUxAMwFlEpoJaCegG9BO0GQC0gkIEzy+F3zF8dk5+eLeH06/LvkcSU+SrSdfYJGQ/GxmF2b2Lv5+4HlrZrdmtgKg50Eh+drMZOuDmenZK2szuwJw0/0AeiD50sx+VDqeGt2Z2RKAwBSFpJz+ZmayOVYE5BzArgPwcKLzsSMLADLQE5LKrGy1kDWABUhemtnXFhqDjjsA5wUAyvJZQ1tLAUijf6/aVHo8hgoBeJPuh1D3PxOdXwBcOe1or1yb2fto/VoAmCjoGR8yQFIl8zZap/q8i39HUpFXBjrZAKg5LLRXBeIgCD0AAPb7okZIytk4Mh4A9wCqyykN+AxAmZozUFGvcwkVzvd5E3uraC6huYT+RaBZIxOHfxVF1s1PQg8QHRBFiOlxj5FmmKi4ljp2lrkWMp0Sz0d1YpEpDRexSKmLzAUaHjv/CCA7pJCUzheRIX32ApCNlDutBEDGpCRW7D0Ucus01Ig19oSkpj0NMy3ktwB1A42mpO8NtN4AkJNFISlwn060JecvNP09Mc9QoyqnmFV67UjhZSnyqZKQCdkak3XNK7K1L70edQ4lVTNo72o2YgwmBK1mNt6mg1I19/emZKp1M4CpIl2y8/9kQJvbe/PmzUrYxDUnkZrkwe2fKwPBkOjCLYCl18HSOpLqAzpGa06gTp1mD9Gd/DGaObNTrnN9CgiS6sRHm50zQB8PGlmh9eeImpaOAtGYSohHLYolFJVNKc3VIEj+SspGHbyGzMWXZwrkKgvA4XyXMDeIDJ2W82c1XTxzjbnNUYlS2ZRK0wUic7XYZqDJcJN0OPHsqUEQzw4gvOQQ1U1rXp/j2ivVrUBk5wBF4NkBHDmz01vlsalvpefgNn2wkTWM3AwglOKcgXkPhANjbCDmEhobufQU2r/n9XTJbk32Jd+QgobHaO8NY7geWQ35EE4f/V5UPH4xuJmsDwQn0hchHt+PrVlODaDlXw3275knBRCyoGtMcaaaWTjNwiZQ8b9/9jgmrfZAwnpVz7oqF5j4an/IHTku0vj094Q/sIxtV9i39k0AAAAASUVORK5CYII=);
        background-size: 100% 100%;
    }

    .study_course_catalogue:hover .hide_catalogue {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADv0lEQVRoQ+1aXW7aQBD+xiTPzQ2anqDkBIUDNJgTBE4QIhWqPmXzVMVUCpwg5ASY5AAhJyicoOQEJc8FT7V2AP+s7TU4qFLNE0K7M/PNzux8MwvB97myRucMboCo7P898TvzDEQ2Fk5ffKvPdPaJ78NjHBjnYDZBdKyzx13DPCGDepdfanerPSS/iJvhEf7QYybDI1p5DqfUFF8/20kGiesHE8byFqAjbcPDC5knOOSquKjPPQCW/XM3430a2DkRnfpEZZywhmWQ8XNrw/0bmSeiY56Q6N63AL7JRah3zmPRNqtKAF37EaBKbrqYmhTxPuMJh44pj0dHkdIBC+dDOB9e4/5XUCZdiPZpT0uPzJuSMQDh03q9zAnRHXFAgEJ5mgLRHcmQ+bhZ51RFuz727xPdYQUwHn2/TUW7pn9ZyFD3kj/ghAgA0a65eZHlI6zROOAZaABgPIlOLXM4hR1eAPBuseIEtCO2CCF1gSpCqAihtQeKOuC6Yq+FzJ4B9H4ThPr8xKsBkmGSJGkbeqxgpFEmynMwV+OYq5oMhoknP5OwRj0QzgMbJN8maJE5AOUgt+dn0TaVTcqlZc+J6N1GF0sdSuodAcA4ilB+Rp8kQeISTYKCtS+F6EKmpuicDtTX7X0DxLc7SPcRUX6hJZe9hsbtkpxhDoLvRLvWSJIjuiMJ7mwXXcz8QlxqyO5vzTzdGIUhw2nDtzW1uAJhtOI8HxYjrPsGw+ltdeqyX4HTWuVOhDp7nBsZGm3MsyRioEdwLwDo98YLzMKNUmbur3koe1tWANibq2MU/T8nIJNbd/Kmeyry5jNQ8hW25J3Ocvm8VRKv6QLDFh2zqWtg3LqrH6MzZu5tN53jMZgvYq/R6J0d4jrMg11ACMu+BVFisdNykGPUA4VMXfoVRE0u3BKELGB5UQmA51jwSWwSK1mmH+UWIETX/u0PG6+Ckx6Z8wqeb3gmHYm+EkCq8SsgGUCE6bRnPFeyVPHIGJN5FqUSKn6fFJSaICKjxbwmc1FuEmpOdDJKA8SbA3AfORbGALJx8H9CsRcftzRIYqNvDiDO0fkpDk2n3yKElFdpeCy+teICgOvfyGw0LUeLEHr1UH6OCL4opdLp/BQXOfCv5YD3zpuWg4FCq3rkSxOQWwiplDNal51aP80G9/Zx95N84fc/DE73lgOuEZG3NB3TE9bIh+40EXmdgAcgx78aAO47814BuCCuH0ym5WCrqdzG21McOJX1nz2STiHPE1jpceO5ZLRAbAZH+2nxgClAA//fE/4CSqXoJOwzMGkAAAAASUVORK5CYII=);
        background-size: 100% 100%;
    }

    .study_catalogue_icon {
        display: inline-block;
        width: 1vw;
        height: 1vw;
    }

    .study_course_catalogue:hover .show_catalogue {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADrUlEQVRoQ+1aXVLiQBD+OujzeoN1T7B4goUDrIQTiCcQqxasfXJ82jJslXAC8QQEPYB4AuEEiydYfBbSW5NomPyQTEKKh63wRMFM//f01z1DUD5X1viMwS0QVdXfE78zz0FkY+kMxM/mXGef+DU6xJ5xBmYTRIc6e9w1zFMyqH/5o3H3sYfkF3EzOsAbPWYSPMKVF3Aqp+Liu50kkLh+MGGsbgE60BY8vJB5in2ui/PmwlPAsp+3E17hwM6R6DanccIJa1QFGc+5BVc3Mk9F1zwi0btvA3xTCFHPzxPRMeuxCvTsR4BqhfFiOqWI9RlP2HdM6R4dRrEGWDpfwvnwHvd/gjTpXHSO+1p8ZN5UjCEI3/z1MidEb8wBAjHM0xiI3liGzNf1OqcuOs2Juk/0RjXAeFR+m4lOQ/+wkKHuJX/ACBEFRKfh5kWWj7DGk4BloKEA40l0G5nDKWzwUgHvFCs9oB2xZQjFF6gyhMoQ8i1Q1gHXFDstZPYcoM/rINTHJ14NkAiTJEhbw+MYRBpForwAc30Tco0Hg2HgyS8krHEfhLPABom3CVpgDkA1iO35RXTM2Cbl0rIXRPRpzYslj1joHVGAcRCB/IwBSYDEFZoGCWsfCtGFTKeiezyMP27vWyC+3YK6AkT5lVZc9Roat0tyRgUQvhOdRiuJjuiNpXIn2/Bi5lfiSkt2fz7ydGMUhgynNd7W5OIShNHeZPkwGWHdtxhOP5fXZb8Cp/2ROxHo7GFuZGi0sciSiIEewT0AoN8bLzEPN0qZsb+mU3a2rFRgZ6bewOj/94AcehlvFb9hd7B6zZu00dNoVDVQUQpbsj+d1eolcxJHpgk5m3FVtKvf4xNm7uebzvEEzOcbj9GIlcLjkC0VEJZ9C6LEYqeVV47RDBSyTZuK9IAsYEVBCYAXWPJRahIXqkDP/quGjVfBSQ/MeQVPGZ7JKSYGO1MgDKc94bmW5UCIjDGZ57tToKBcioxV0hKmqBAqjk5wllt6IM2DH/+XHni3RJkDyFmJyxBKCyH3qnVpyGuhYLXTyFKdorQTD+RRQkd4d/Kxq0KWRQld4eMV8O55NRzsL4m95IsdQGmEUxbhXQXibhgZ7ctuY6CjhLef5A2/ejE421iJkzyRVXi/mEXu0nRET1gjL7oTp2gxnsgrvOuFIp8aAO49czoWUpTYRnjfC9cPJtNqmGsqt7b2DHtOzX/skeZI7zWLYasjvbQ9iZ71ng20QWwGR/upVGcADdXnCf8ABwIEM6+0zusAAAAASUVORK5CYII=);
        background-size: 100% 100%;
    }

    .show_catalogue {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAADGklEQVRoQ+1a23XTQBCdWwF0AFQAroCkA6iApIKEDtIBcQWECqADkgqwK4hdAU4Fl3PNyoxX2uyurKMPzu6X4kjzftwZCeYOySszuzCzd/73zPXGzH6Y2RKArrOH5GszE68PZqbr0rMyszsAy+4B6ILkSzP7WSl4zHRnZpcApEzykJSBvpiZeI49UuQcwK5T4NeJwntBFgDEoHdIyrPiNcVZAViA5HWwyBREReMewHlCAXn5bCpGe4+TjK3/oNiUe0oYJQzwJs6HEPePEc3PAG4L+SjkFJ7v3f0rKcCIQI95jgFJhcxbd5/i894/R1KWlwe6swZQUyyUq0r4IyP0FACwz4uaQ1LCesuUKPAAoDqcYoM3BeSp5oGKeG0hlKjvLYlLo6iFUAuhfxaYrJEJw79yli3GJ6EHCA4IInh43EOkA0hUWEsdexC5JjwdA8+tOrHAlIYLf0S0CMwFGO6F3wIYHFJIiuYLx0h/lyogHjF2WkoBMRMRT7i0KAzdp6HmLmFBDTNfTyHunn2SQt1Ao9Hu+wSEvwGQkMlDUsp9OpGXhL/Q9HdAniFGFU4eVZby2ZrZTcryMZEwVt5EuVfKS/PKdZc7PegcQqpm0N7VJKKXMhitZjbexINSNfYvNdNc9zUF5rJ0is//74Gw9PID+9PYpB2oRmpMNf1HTfJo+5f1wMA2YRSGiaqP+oBKdk0F6kho9hDc2Xfw2RUgqU78bLMrzKuPR40s9dCUHggNbCooIRy1mNUDJH9HYSNIUAPmfC7K5svZFBiA0xL+rKYgDKwxN3MqEK8WRxWD3kycS5ipcmBCOke73OaBnAe7/zcPBEu0HDCzsdWjVSFFUTKEAuoUUIq7XUmeZpvSLEk8Uoms8MFy84RQpRJFwicU2L/nLXGvK8X9l3xDBAqVKBY+KNBjHtYjh88GMvskPS8k618MrpOdOKNElfDOgvGLkBoHDN17+SyUSCgxSvjghSk/Ndi/Zy7BQhr7uuo0WnjnBa0xtV6smYVj668DFP/7sUfuBE/oNf9hpZd7piCetSqXMn61nyMrwW/9CvMPKjNzV05/3PsAAAAASUVORK5CYII=);
        background-size: 100% 100%;
    }

    .study_course_catalogue:hover .study_catalogue_name {
        color: #808bb1;
    }

    .study_catalogue_name {
        font-size: 1vw;
        color: silver;
        margin-left: 10px;
        font-family: Medium;
    }

    .right {
        width: 13.02083333vw;
    }

    .infor_pack_downl .downl_icon {
        display: inline-block;
        width: 3.125vw;
        height: 2.76041667vw;
        background: url(data:image/png;base64,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);
        background-size: 100% 100%;
    }

    .infor_pack_downl .downl_text, .prog {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .infor_pack_downl .downl_text {
        font-size: .83333333vw;
        line-height: .83333333vw;
        font-family: Normal;
        margin-top: .26041667vw;
    }

    .catalogue_container {
        width: 100%;
        height: 100%;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .prog {
        width: 12vw;
        height: 100%;
        position: absolute;
        top: 16vh;
    }

    .infor_pack_downl .downl_text, .prog {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .mulu-Tab {
        position: relative;
        overflow: hidden;
    }

    .mulu-Tab .munu_line {
        width: 100%;
        height: 90%;
        border-left: 1px dashed #ccc;
        position: absolute;
        left: 1.45833333vw;
        top: .20833333vw;
    }

    .preface {
        height: 1.82291667vw;
        line-height: 1.82291667vw;
        text-align: left;
        cursor: pointer;
        position: relative;
        top: 0;
        font-size: .9375vw;
        padding-left: .83333333vw;
        color: silver;
    }

    .one_level {
        height: 2.08333333vw;
        line-height: 2.08333333vw;
        text-align: left;
        cursor: pointer;
        top: 0;
        font-size: .9375vw;
        color: silver;
        padding-left: .83333333vw;
        position: relative;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .two_level {
        height: 1.82291667vw;
        line-height: 1.82291667vw;
        position: relative;
        top: 0;
        color: silver;
        font-size: .72916667vw;
        text-align: left;
        padding-left: 3.38541667vw;
        overflow: hidden;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .add_back:hover, .one_level:hover, .preface:hover, .two_level:hover {
        background: rgba(14,13,13,.4);
    }

    .two_level:hover {
        cursor: pointer;
    }

    .remove_back {
        background: none;
    }



    .serial_number {
        font-size: 1.04166667vw;
        display: inline-block;
        background: #344863;
        color: silver;
        width: 1.30208333vw;
        line-height: 1.30208333vw;
        height: 1.30208333vw;
        border-radius: 50%;
        position: relative;
        margin-right: .36458333vw;
    }

    .active_xuhao {
        background: #ff5800;
    }


    .history_lable {
        display: inline-block;
        width: .78125vw;
        height: .57291667vw;
        position: absolute;
        right: -0.01vw;
    }

    .check_icon, .check_icon_2 {
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAALCAYAAACgR9dcAAABH0lEQVQoU5WSTStEcRTGf89Md6Q0kTQSwspGFpOUnZKajQzdsPEZbPkKSvkQ0rizolAWJpqSjIWlbzB2dtPo3qM77h3zgsZ/9z+n33NeniP+8cxlgASrJCjrlKp6Zc1llCRlYAZ4453JnmBbY4x+HhATUbE6NTJN2LI4qvDR2YltMI7DEyIT5QKMXRU4kbmMkOQWY5qAA3kcxwK2zRTGM2KoETN8fHZUxAu/si1yiMsI8DH2VeDQNpnF4QVwmqCR1xkXsXhYOdxgCZFtEThC7LWBATl53LSO1ZjZ8gyT4gqx0LX9r1aXVeS+M/e9sHUG6eMaWCSOhmDAkjwef7K0zSrLkSbNHWIeow7MqcDrb7fQ5bO5pBAr1KjonOpfR/QJgHRTuuE1JgcAAAAASUVORK5CYII=);
        background-size: 100% 100%;
        margin-top: .67708333vw;
    }



</style>