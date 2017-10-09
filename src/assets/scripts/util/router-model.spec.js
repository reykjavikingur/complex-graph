const should = require('should');
const RouterModel = require('./router-model');

describe('RouterModel', () => {

    it('should exist', () => {
        should(RouterModel).be.ok();
    });

    describe('for only index', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['index']);
        });
        it('should find /', () => {
            should(router.findRoute('/')).eql('index');
        });
        it('should split /', () => {
            should(router.splitRoute('/')).eql(['index', '']);
        });
        it('should not find invalid path', () => {
            should(router.findRoute('/asdf')).not.be.ok();
        });
    });

    describe('for index and about', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['index', 'about']);
        });
        it('should find /', () => {
            should(router.findRoute('/')).eql('index');
        });
        it('should find /about', () => {
            should(router.findRoute('/about')).eql('about');
        });
        it('should split /about', () => {
            should(router.splitRoute('/about')).eql(['about', '']);
        });
        it('should not find invalid path', () => {
            should(router.findRoute('/asdf')).not.be.ok();
        });
        it('should split invalid path', () => {
            var r = router.splitRoute('/asdf');
            should(r[0]).not.be.ok();
        });
    });

    describe('for foo/bar', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['foo/bar']);
        });
        it('should find /foo/bar/', () => {
            should(router.findRoute('/foo/bar/')).eql('foo/bar');
        });
        it('should find /foo/bar', () => {
            should(router.findRoute('/foo/bar')).eql('foo/bar');
        });
        it('should not find /foo', () => {
            should(router.findRoute('/foo')).not.be.ok();
        });
    });

    describe('for product', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['product']);
        });
        it('should find /product', () => {
            should(router.findRoute('/product')).eql('product');
        });
        it('should split /product', () => {
            should(router.splitRoute('/product')).eql(['product', '']);
        });
        it('should find /product/abc', () => {
            should(router.findRoute('/product/abc')).eql('product');
        });
        it('should split /product/abc', () => {
            should(router.splitRoute('/product/abc')).eql(['product', 'abc']);
        });
    });

    describe('for index and product', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['index', 'product']);
        });
        it('should find /', () => {
            should(router.findRoute('/')).eql('index');
        });
        it('should find /product', () => {
            should(router.findRoute('/product')).eql('product');
        });
        it('should split /product', () => {
            should(router.splitRoute('/product')).eql(['product', '']);
        });
        it('should find /product/abc', () => {
            should(router.findRoute('/product/abc')).eql('product');
        });
        it('should split /product/abc', () => {
            should(router.splitRoute('/product/abc')).eql(['product', 'abc']);
        });
    });

    describe('for index and product and product/special', () => {
        var router;
        beforeEach(() => {
            router = new RouterModel(['index', 'product', 'product/special']);
        });
        it('should find /', () => {
            should(router.findRoute('/')).eql('index');
        });
        it('should find /product', () => {
            should(router.findRoute('/product')).eql('product');
        });
        it('should split /product', () => {
            should(router.splitRoute('/product')).eql(['product', '']);
        });
        it('should find /product/abc', () => {
            should(router.findRoute('/product/abc')).eql('product');
        });
        it('should split /product/abc', () => {
            should(router.splitRoute('/product/abc')).eql(['product', 'abc']);
        });
        it('should find /product/special', () => {
            should(router.findRoute('/product/special')).eql('product/special');
        });
        it('should split /product/special', () => {
            should(router.splitRoute('/product/special')).eql(['product/special', '']);
        });
    });
});