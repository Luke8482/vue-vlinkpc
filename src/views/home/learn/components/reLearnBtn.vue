<template>
    <div class="redo_btn_wrap">
        <div class="redo_btn" @click="delRelearn">重学一遍</div>
        <div class="redo_modal" v-if="ShowTips">
            <div   class="root">
                <div  class="modal_body">
                    <div  class="container">
                        <div  class="suggest">再学一遍会重置本关的学习进度哦，重置后的进度将不会被保存呢~</div>
                        <div  class="option" @click="noMoreShowTips = !noMoreShowTips">
                            <div  class="unselect" v-if="!noMoreShowTips"></div>
                            <img data-v-21eed9ac="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAACsElEQVRIic3XPUwTYRzH8e/1oCBtLVhgQSMGUMEWNFagoAZdjC8QCIPBhcRB3RQdTNBRE2OMrLqg0USMrwOyigFbVIiBQqVKonCDEau8tUWo9s6hUAUKFNMj/sZ7nuRz/+ee/91zQrajBYB693A5UAfsAvTELj6gE7guSdIzACHb0UK9e/jSiFa80JpmYFCnZVojxExMkBUy/QH2ebysCwQvS5J0UWhsbDwyohWbb280MSXGDpufxKBC7dAIpsCvCg1wtjXNoCoIMCUKvEjTA9RpAOugTqsqOJtPIceqAQyxfIZLJRByDBo1Eb0Yx6mMLLLWzG2GODXRe9uKydWtJSfJwLmB7vB11SptmgEBmr4MzRlTpdJHlhIK9MkAVDrtuPzj6qJNZlsYLHe+xO2fWDAnpst7N68IqyEFgBrXq4jgoqhFb+RKVj4WvTFqsMlso9hoAqC610HXxMiicyOilakZVKev54mllB0zd75UZiuUUah02nH6xpacHxG9KrlpH/MA8MBswzZTwfyIgkBLwR6KjSamZZmD3e0LNk3U6LQsc7y/k+ejXwG4k1fEzggVP7WUsjnJAMDhnjY+/vAtCy6Kzuaku4su7ygA9802thuSw2OPLaXhPqx02hmamowKXBYFqOnrwDH+HYCH5hL2p6RzK7eQfL2RoKJwqKctqiVdEQpQ++41b2cqvrnVyu7kVACqeu0MTEa3pCtGAY72ddDt/bMrq3sd9C/Sh8tlRW+kY65XnN6Qg33827JtETP0pyJzTXr/z9hsVP2e/neoN0FWVgXThhyfBujK9AdWBd0Ucjo1QEOZx0diUN1qE4MKZR4fQIPoOn/iw4Fhb/wW39Reb5yIN14kKMTudKiVFbJ9Aao+j2EKnfBvCH/9y1QAZ4BCQBczFfzAG6BBkqRmgN/owvCEqFwqIgAAAABJRU5ErkJggg==" class="select"
                                 v-if="noMoreShowTips"
                            >
                            <div  class="phrase">不再提示</div>
                        </div>
                        <div  class="button_group">
                            <div  class="cancel" @click="cancel">取消</div>
                            <div  class="cancel help" @click="relearn">确认</div>
                        </div>
                    </div>
                </div>
                <div  class="bottom_triangle"></div>
                <div  class="triangle_filter"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "reLearnBtn",
        data(){
            return{
                ShowTips: false,     //  控制提示界面的显示
                noMoreShowTips: false,   //  控制界面以后是否再次提示
            }
        },
        methods:{
            delRelearn(){
                if (this.noMoreShowTips && !this.ShowTips){   //  如果选择了不再提示,并且没有显示提示的情况下，那就直接调用重学一遍的逻辑
                    this.relearn();
                }else{         //  否则显示提示内容
                    this.ShowTips = true;
                }
            },
            relearn(){
                this.$emit('relearn');
                this.ShowTips = false;
            },
            cancel(){
                this.ShowTips = false;
                this.noMoreShowTips = false;
            }

        }

    }
</script>

<style scoped>

    /*从新学习按钮样式*/
    .redo_btn_wrap {
        position: fixed;
        top: 1vh;
        right: 1.47vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        height: 2vw;
        z-index: 1000;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
    }

    .redo_btn {
        line-height: 1.5;
        font-size: .88vw;
        text-align: center;
        letter-spacing: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        color: #fff;
        cursor: pointer;
        border-bottom: 1px solid #fff;
        opacity: .6;
    }

    .redo_modal {
        position: absolute;
        top: 3.5vw;
        right: 9.6vw;
    }

    .redo_modal {
        position: absolute;
        top: 3.5vw;
        right: 9.6vw;
    }

    .root {
        position: relative;
        width: 14.6vw;
        height: 7vw;
        z-index: 999;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .modal_body {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .container {
        width: 16vw;
        height: 8.4vw;
        background: #fff;
        border-radius: .8vw 0 .8vw .8vw;
        padding: 1vw 1vw .6vw;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }

    .suggest {
        font-size: .85vw;
        font-weight: 400;
        font-stretch: normal;
        letter-spacing: .02vw;
        color: #000;
        line-height: 1.6;
    }

    .option {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        line-height: 1;
        cursor: pointer;
    }

    .select, .unselect {
        width: .8vw;
        height: .85vw;
        margin-right: .2vw;
        cursor: pointer;
    }

    .unselect {
        border-radius: .11vw;
        border: 1px solid hsla(0,0%,62%,.4);
    }

    .phrase {
        font-size: .85vw;
        letter-spacing: .01vw;
        color: #a1a1a1;
    }

    .button_group {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        width: 80%;
        margin-left: 10%;
        margin-bottom: 1vw;
    }

    .cancel {
        width: 4.57vw;
        height: 1.7vw;
        border-radius: .85vw;
        border: 1px solid #d7d7d7;
        line-height: 1.7vw;
        font-size: .74vw;
        letter-spacing: .06vw;
        color: #a4a4a4;
        text-align: center;
        cursor: pointer;
    }

    .help {
        width: 4.57vw;
        height: 1.7vw;
        border-radius: .85vw;
        line-height: 1.7vw;
        font-size: .85vw;
        letter-spacing: .06vw;
        margin-left: .69vw;
        background-color: #fcd17b;
        color: #262623;
    }

    .cancel {
        width: 4.57vw;
        height: 1.7vw;
        border-radius: .85vw;
        border: 1px solid #d7d7d7;
        line-height: 1.7vw;
        font-size: .74vw;
        letter-spacing: .06vw;
        color: #a4a4a4;
        text-align: center;
        cursor: pointer;
    }

    .bottom_triangle {
        position: absolute;
        right: -3.4vw;
        top: -.8vw;
        width: 0;
        height: 0;
        border-left: 1.2vw solid transparent;
        border-bottom: .8vw solid #fff;
        z-index: 1;
    }

    .triangle_filter {
        position: absolute;
        left: -.9vw;
        top: .9vw;
        border-top: .6vw solid transparent;
        border-bottom: .6vw solid transparent;
        border-right: 1.1vw solid rgba(4,0,0,.1);
        z-index: -1;
        -webkit-filter: blur(.1vw);
        filter: blur(.1vw);
    }
</style>