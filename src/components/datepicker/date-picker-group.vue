<template>
  <div class="date-picker-group">
    <div class="row">
      <label>{{label}}</label>
      <div class="input-container">
        <!-- <div class="check-container">
          <input type="checkbox" v-model="checked" @click="handleCheck" />
          <span> {{ checkVal }}</span>
        </div> -->
        <!-- <div class="value" :class="{'empty': !value, 'dirty': !value && selfDirty}" @click="openPicker">{{value ? new Date(value).getFullYear() + '-' + (new Date(value).getMonth() + 1) + '-' + new Date(value).getDate() : placeholder}}</div> -->
        <div class="value" :class="{'empty': !value, 'dirty': !value && selfDirty}" @click="openPicker()">{{pickerStr}}</div>
      </div>
      <mt-datetime-picker ref="picker" type="date" yearFormat="{value} 年" monthFormat="{value} 月" dateFormat="{value} 日" :startDate="startDate" :endDate="endDate" :value="pickerValue" @confirm="handleConfirm">
      </mt-datetime-picker>
    </div>
    <img src="../../assets/image/jiantouxia.png" alt="" class="arrow-xia">
  </div>
</template>
<script>
    var nowDate = new Date();

    export default {
        name: "datePickerGroup",
        data: function() {
            return {
                selfDirty: false,
                pickerValue: (!this.value || this.value == "长期") ? new Date() : new Date(this.value),
                startDate: new Date(this.option.startDate),
                endDate: this.option.endYear ?
                    new Date(
                        nowDate.getFullYear() +
                        this.option.endYear +
                        "/" +
                        (nowDate.getMonth() + 1) +
                        "/" +
                        nowDate.getDate()
                    ) : new Date(this.option.endDate)
            };
        },
        props: ["value", "option", "label", "placeholder", "dirty", "category"],
        mounted() {
            this.$refs.picker.$el.addEventListener('click', () => {
                if (!this.$refs.picker.visible) {
                    document.getElementsByClassName('page')[0].style.pointerEvents = 'all';
                    this.stopScroll(false);
                }
            });
            this.changeDom()
        },
        methods: {
            openPicker() {
                this.changeChecked()
                this.selfDirty = true;
                this.$refs.picker.open();
                // document.getElementsByClassName('page')[0].style.pointerEvents = 'none';
                this.stopScroll(true);

                setTimeout(() => {
                    document.getElementsByClassName('v-modal')[0].addEventListener('click', () => {

                        if (!this.$refs.picker.visible) {
                            // document.getElementsByClassName('page')[0].style.pointerEvents = 'all';
                            this.stopScroll(false);
                        }
                    });
                    let checkbox = this.$el.getElementsByClassName("switch-checkbox")[0];
                    let mask = this.$el.getElementsByClassName("mask-style")[0];
                    let pickerItem = this.$el.getElementsByClassName("picker-items")[0];
                    checkbox.addEventListener("click", function() {
                        mask.style.display = checkbox.checked ? "block" : "none";
                        pickerItem.style.opacity = checkbox.checked ? ".5" : "1";
                    })
                }, 100)
            },
            handleConfirm(value) {
                let checkbox = this.$el.getElementsByClassName("switch-checkbox")[0];
                let emitVal = checkbox.checked ? "长期" : value;
                this.$emit("input", emitVal);
            },
            changeChecked() {
                let checkbox = this.$el.getElementsByClassName("switch-checkbox")[0];
                let mask = this.$el.getElementsByClassName("mask-style")[0];
                let pickerItem = this.$el.getElementsByClassName("picker-items")[0];
                checkbox.checked = this.value == "长期" ? true : false;
                mask.style.display = checkbox.checked ? "block" : "none";
                pickerItem.style.opacity = checkbox.checked ? ".5" : "1";
            },
            changeDom() {
                let category = this.category;
                let parent = this.$refs.picker.$el.children[0];
                let sel = document.createElement('div');
                sel.className = "sel-style"
                sel.innerHTML = `
                    <span> 长期</span>
                    <input type="checkbox" name="${category}" id="time-switch-${category}" class="switch-checkbox"/>
                    <label for="time-switch-${category}" class="switch-label"></label>
                `
                parent.insertBefore(sel, parent.children[1])
                this.addMask();
            },
            addMask() {
                let parent = this.$refs.picker.$el.children[0];
                let bottom = parent.getElementsByClassName("picker-items")[0]
                let mask = document.createElement('div');
                mask.className = "mask-style";
                bottom.append(mask)
            },
            stopScroll: function() {

                var handleStopScroll = function(evt) {
                    evt.preventDefault();
                }

                return function(tag) {
                    if (tag) {
                        console.log('禁止滚动');
                        document.getElementsByClassName('page')[0].addEventListener('touchmove', handleStopScroll);
                    } else {
                        console.log('开启滚动');
                        document.getElementsByClassName('page')[0].removeEventListener('touchmove', handleStopScroll);
                    }
                }
            }()
        },
        watch: {
            value: function(v) {
                if (v && v !== "长期") {
                    this.pickerValue = new Date(v);
                } else {
                    this.pickerValue = new Date();
                }
            },
            dirty: function(v) {
                if (v) this.selfDirty = true;
            },
        },
        computed: {
            pickerStr: function() {
                if (!this.value) {
                    return this.placeholder
                } else if (this.value == "长期") {
                    return "长期";
                } else {
                    return new Date(this.value).getFullYear() + '-' + (new Date(this.value).getMonth() + 1) + '-' + new Date(this.value).getDate()
                }
            }
        }
    };
</script>
<style>
    .date-picker-group {
        position: relative;
        background-color: #fff;
        padding: 0.32rem 0 0.266667rem;
        border-bottom: 1px solid #eee;
        clear: both;
        overflow: hidden;
        pointer-events: all;
    }
    
    .date-picker-group>.row>label {
        float: left;
        font-size: 0.373333rem;
        color: #333;
        margin-right: .266667rem;
        width: 1.866667rem;
        min-width: 60px;
    }
    
    .date-picker-group .value {
        float: left;
        font-size: 0.373333rem;
        color: #333;
        line-height: 0.56rem;
        width: 5.333333rem;
    }
    
    .date-picker-group .arrow-xia {
        position: absolute;
        top: 0.586667rem;
        right: 0.133333rem;
        transform: translateY(-50%);
        width: 0.373333rem;
    }
    
    .date-picker-group input {
        position: relative;
        top: -0.026667rem;
        width: 0.4rem;
        height: 0.4rem;
        vertical-align: middle;
        border: none;
    }
    
    .date-picker-group input::before {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/image/checkbox-off.png");
        background-size: 100%;
    }
    
    .date-picker-group input::after {
        content: "";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url("../../assets/image/checkbox-on.png");
        background-size: 100%;
        opacity: 0;
    }
    
    .date-picker-group input:checked::after {
        opacity: 1;
    }
    
    .date-picker-group .check-container {
        position: relative;
        font-size: 0.373333rem;
        float: left;
        /* padding-top: .053333rem; */
        margin-right: 5px;
        /* padding-left: 2.48rem; */
        line-height: 0.56rem;
    }
    
    .date-picker-group .empty {
        color: #858585;
    }
    
    .date-picker-group .input-container {
        position: relative;
        float: left;
        height: 100%;
    }
    
    .date-picker-group .ps-container {
        position: absolute;
        font-size: 0.32rem;
        color: #ff0000;
        bottom: -0.266667rem;
        /* transform: scale(.9); */
    }
    
    .date-picker-group .dirty {
        color: #f00;
    }
    
    .date-picker-group .sel-style {
        height: 45px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: #333333;
        line-height: 45px;
        display: flex;
        justify-content: space-around;
    }
    
    .date-picker-group .switch-checkbox {
        display: none;
    }
    
    .date-picker-group .switch-label {
        position: relative;
        box-sizing: border-box;
        top: 12px;
        display: block;
        border-radius: 24px;
        height: 26px;
        width: 40px;
        cursor: pointer;
        background: #FFFFFF;
        border: 1px solid #E5E5E5;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0)
    }
    
    .date-picker-group .switch-label::before {
        content: '';
        display: block;
        border-radius: 24px;
        height: 24px;
        background-color: white;
        transform: scale(1, 1);
        -webkit-transform: scale(1, 1);
        transition: all 0.3s ease;
        -webkit-transition: all 0.3s ease;
    }
    
    .date-picker-group .switch-label::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -11px;
        margin-left: -9px;
        width: 22px;
        height: 22px;
        border-radius: 22px;
        background-color: white;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.08);
        transform: translateX(-9px);
        transition: all 0.3s ease;
        -webkit-transform: translateX(-9px);
        -webkit-transition: all 0.3s ease;
    }
    
    .date-picker-group .switch-checkbox:checked~.switch-label:after {
        transform: translateX(5px);
        -webkit-transform: translateX(5px);
    }
    
    .date-picker-group .switch-checkbox:checked~.switch-label:before {
        background-color: #FAA200;
    }
    
    .date-picker-group .mask-style {
        display: none;
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.05);
        z-index: 99;
        color: white;
    }
</style>