var vkbeautify = require(".."),
    expect = require('chai').expect;

describe('vkbeautify', function () {

    it("should export the library", function () {
        expect(vkbeautify).to.exist;
        expect(vkbeautify.VkBeautify).to.be.an.instanceof(Function);
        expect(vkbeautify.vkbeautify).to.be.an.instanceof(vkbeautify.VkBeautify);
    });


    describe('xml', function () {

        it("root tag", function () {

            var input = "<foo />",
                output = vkbeautify.vkbeautify.xml(input);

            expect(output).to.eql("<foo />");

        });

        it("should indent xml", function () {

            var input = "<foo><bar/></foo>",
                output = vkbeautify.vkbeautify.xml(input);

            expect(output).to.eql("<foo>\n    <bar/>\n</foo>");

        });

    });

});