(function(){
   angular.module('primeiraApp').component('paginator', {
       bindings: {
           url: '@',
           pages: '@',
       }, 
       controller: [
           '$location',
           function($location) {
               this.$onInit = function() {
                   const pages = parseInt(this.pages) || 1
                   this.pagesArray = Array(pages).fill(0).map((e ,i) => i + 1)
                   this.current = parseInt($location.search().page) || 1
                   this.needPagination = this.pages > 1     // Determina se precisa de paginação
                   this.hasPrev = this.current > 1          // Mostra botão anterior se a página atual for maior  que 1
                   this.hasNext = this.current < this.pages  // Mostra botão proximo se número da página atual for menor que a paginação

                   this.isCurrent = function(i) {    // Verifica se é o elemento corrente
                       return this.current == i
                   }
               }
            }
               
       ],
       template: `
            <ul ng-if="$ctrl.needPagination" class="pagination pagination-sm no-margin pull-right">
                <li ng-if="$ctrl.hasPrev">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current - 1}}">Anterior</a>
                </li>

                <li ng-class="{active: $ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
                    <a href="{{ $ctrl.url }}?page={{ index }}">{{ index }}</a>
                </li>

                <li ng-if="$ctrl.hasNext">
                    <a href="{{ $ctrl.url }}?page={{ $ctrl.current + 1}}">Próximo</a>
                </li>
            </ul>
        `
   }) 
    
    
})()