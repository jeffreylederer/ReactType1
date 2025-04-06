CREATE TABLE [dbo].[RecoverPassword] (
    [Id]     UNIQUEIDENTIFIER NOT NULL,
    [time]   DATETIME         NOT NULL,
    [userid] INT              NOT NULL,
    CONSTRAINT [PK_RecoverPassword] PRIMARY KEY CLUSTERED ([Id] ASC)
);

