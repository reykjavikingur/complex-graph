var template = `
<div class="layout">

    <vl-header/>
    
    <slot></slot>
    
    <vl-footer/>
    
</div>
`;

module.exports = Vue.component('vl-layout', {
    template: template
});
