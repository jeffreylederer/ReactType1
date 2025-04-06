--
CREATE FUNCTION [dbo].[HasWheelChair] 
(
	@W1 as bit,
	@W2 as bit,
	@w3 as bit
)
RETURNS varchar(5)
AS
BEGIN
	if @W1 = 1
		return 'Red'
	if @W2 = 1
		return 'Red'
	if @W3 = 1
		return 'Red'
	return 'Black'

END
